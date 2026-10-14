"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { LevelDefinition } from "../level-data";
import { getLevelById } from "../level-data";

type GameStatus = "loading" | "playing" | "paused" | "won" | "lost" | "error";
type DirectionKeys = {
  left: { pressed: boolean };
  right: { pressed: boolean };
};
type GameImages = {
  decorative: HTMLImageElement;
  platform: HTMLImageElement;
  background: HTMLImageElement;
  hills: HTMLImageElement;
  platformSmall: HTMLImageElement;
  marioLeft1: HTMLImageElement;
  marioLeft2: HTMLImageElement;
  marioRight1: HTMLImageElement;
  marioRight2: HTMLImageElement;
  marioStationary: HTMLImageElement;
};

type GameObject = {
  position: { x: number; y: number };
  image: HTMLImageElement;
  width: number;
  height: number;
  draw: (context: CanvasRenderingContext2D) => void;
};

const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 576;

const DECORATIVE_BLOCK_WIDTH = 291;
const DECORATIVE_BLOCK_HEIGHT = 291;

const GRAVITY = 1.5;
const ASSET_PATHS = {
  decorative: "/decorative.png",
  platform: "/platform.png",
  background: "/background.png",
  hills: "/hills.png",
  platformSmall: "/platformSmallTall.png",
  marioLeft1: "/mario-left-1.png",
  marioLeft2: "/mario-left-2.png",
  marioRight1: "/mario-right-1.png",
  marioRight2: "/mario-right-2.png",
  marioStationary: "/mario-stationary.png",
} as const;

function loadImages(): Promise<GameImages> {
  const entries = Object.entries(ASSET_PATHS) as [keyof GameImages, string][];

  return Promise.all(
    entries.map(
      ([key, src]) =>
        new Promise<[keyof GameImages, HTMLImageElement]>((resolve, reject) => {
          const image = new Image();
          image.onload = () => resolve([key, image]);
          image.onerror = () =>
            reject(
              new Error(
                `Couldn't load ${src}. Check that the file exists in public/.`,
              ),
            );
          image.src = src;
        }),
    ),
  ).then((loaded) => Object.fromEntries(loaded) as GameImages);
}

class Player {
  speed = 12;
  position = { x: 100, y: 100 };
  velocity = { x: 0, y: 0 };
  width = 60;
  height = 60;
  canJump = false;
  frameIndex = 0;
  frameInterval = 100;
  lastFrameTime = 0;
  currentDirection = "stationary";

  draw(
    context: CanvasRenderingContext2D,
    images: GameImages,
    keys: DirectionKeys,
  ) {
    const now = performance.now();
    let image = images.marioStationary;
    let frames: HTMLImageElement[] | undefined;
    let direction = "stationary";

    if (keys.left.pressed) {
      direction = "left";
      frames = [images.marioLeft1, images.marioLeft2];
    } else if (keys.right.pressed) {
      direction = "right";
      frames = [images.marioRight1, images.marioRight2];
    }

    if (frames) {
      if (this.currentDirection !== direction) {
        this.currentDirection = direction;
        this.frameIndex = 0;
        this.lastFrameTime = now;
      } else if (now - this.lastFrameTime >= this.frameInterval) {
        this.frameIndex = (this.frameIndex + 1) % frames.length;
        this.lastFrameTime = now;
      }
      image = frames[this.frameIndex];
    } else {
      this.currentDirection = "stationary";
      this.frameIndex = 0;
      this.lastFrameTime = now;
    }

    context.drawImage(
      image,
      this.position.x,
      this.position.y,
      this.width,
      this.height,
    );
  }

  update(
    context: CanvasRenderingContext2D,
    images: GameImages,
    keys: DirectionKeys,
  ) {
    this.draw(context, images, keys);
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    this.position.x = Math.max(100, this.position.x);

    if (this.position.y + this.height + this.velocity.y <= CANVAS_HEIGHT) {
      this.velocity.y += GRAVITY;
    }
  }
}

class Platform implements GameObject {
  position: { x: number; y: number };
  image: HTMLImageElement;
  width: number;
  height: number;

  constructor(x: number, y: number, image: HTMLImageElement) {
    this.position = { x, y };
    this.image = image;
    this.width = image.naturalWidth;
    this.height = image.naturalHeight;
  }

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height,
    );
  }
}

class GenericObject implements GameObject {
  position: { x: number; y: number };
  image: HTMLImageElement;
  width: number;
  height: number;

  constructor(
    x: number,
    y: number,
    image: HTMLImageElement,
    width = image.naturalWidth,
    height = image.naturalHeight,
  ) {
    this.position = { x, y };
    this.image = image;
    this.width = width;
    this.height = height;
  }

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height,
    );
  }
}

function createPlatforms(level: LevelDefinition, images: GameImages) {
  return level.platforms.map(
    (definition) =>
      new Platform(
        definition.x,
        definition.y,
        definition.type === "ground" ? images.platform : images.platformSmall,
      ),
  );
}

export default function GameCanvas({
  levelId,
  levelTitle,
}: {
  levelId: string;
  levelTitle: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keysRef = useRef<DirectionKeys>({
    left: { pressed: false },
    right: { pressed: false },
  });
  const gameActionsRef = useRef<{
    togglePause: () => void;
    restart: () => void;
    jump: () => void;
  } | null>(null);
  const [status, setStatus] = useState<GameStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const level = getLevelById(levelId);

    if (!canvas || !context || !level) {
      setErrorMessage("The game could not be initialized.");
      setStatus("error");
      return;
    }

    let disposed = false;
    let animationFrame = 0;
    let images: GameImages | null = null;

    // Background music for the current level
    const musicAudio = new Audio("/audio/mario_music.m4a");
    musicAudio.loop = true;
    musicAudio.preload = "auto";

    // Jump sound effect
    const jumpAudio = new Audio("/audio/mario_jump.m4a");
    jumpAudio.preload = "auto";

    let player = new Player();
    let platforms: Platform[] = [];
    let genericObjects: GenericObject[] = [];
    let decorativeObjects: GenericObject[] = [];
    let scrollOffset = 0;
    let currentStatus: GameStatus = "loading";
    const keys = keysRef.current;

    // Start the music if the game is actively playing.
    const tryStartMusic = () => {
      if (currentStatus !== "playing" || !musicAudio.paused) return;

      void musicAudio.play().catch(() => {
        // Some browsers block autoplay until the player interacts.
        // Keyboard and pointer listeners below retry playback.
      });
    };

    // Stop and reset the jump sound so it never overlaps itself.
    const stopJumpSound = () => {
      jumpAudio.pause();
      jumpAudio.currentTime = 0;
    };

    // Restart the jump sound every time Mario successfully jumps.
    const playJumpSound = () => {
      jumpAudio.pause();
      jumpAudio.currentTime = 0;

      void jumpAudio.play().catch(() => {});
    };

    const changeStatus = (nextStatus: GameStatus) => {
      currentStatus = nextStatus;

      if (!disposed) setStatus(nextStatus);

      if (nextStatus === "playing") {
        // Start music on level entry and resume it after pausing.
        tryStartMusic();
      } else {
        // Stop music and any remaining jump sound.
        musicAudio.pause();
        stopJumpSound();

        // Death and victory reset the music for a future new run.
        if (nextStatus === "lost" || nextStatus === "won") {
          musicAudio.currentTime = 0;
        }
      }

      if (nextStatus !== "playing") {
        keys.left.pressed = false;
        keys.right.pressed = false;
      }
    };

    const resetGame = () => {
      if (!images) return;

      const decorativeImage = images.decorative;

      player = new Player();
      platforms = createPlatforms(level, images);

      genericObjects = [
        new GenericObject(-100, -1, images.background),
        new GenericObject(-100, -1, images.hills),
      ];

      decorativeObjects = (level.decorativeBlocks ?? []).map(
        ({ x, y }) =>
          new GenericObject(
            x,
            y,
            decorativeImage,
            DECORATIVE_BLOCK_WIDTH,
            DECORATIVE_BLOCK_HEIGHT,
          ),
      );

      scrollOffset = 0;
      changeStatus("playing");
    };

    const jump = () => {
      if (currentStatus === "playing" && player.canJump) {
        player.velocity.y = -24;
        player.canJump = false;

        playJumpSound();
      }
    };

    gameActionsRef.current = {
      togglePause: () => {
        if (currentStatus === "playing") {
          changeStatus("paused");
        } else if (currentStatus === "paused") {
          changeStatus("playing");
        }
      },
      restart: resetGame,
      jump,
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const isGameKey = [
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "Space",
        "KeyA",
        "KeyD",
        "KeyW",
      ].includes(event.code);
      if (isGameKey && currentStatus === "playing") event.preventDefault();

      // Retry music playback during keyboard interaction if needed.
      tryStartMusic();

      if (currentStatus !== "playing") return;

      if (event.code === "ArrowLeft" || event.code === "KeyA")
        keys.left.pressed = true;
      if (event.code === "ArrowRight" || event.code === "KeyD")
        keys.right.pressed = true;
      if (!event.repeat && ["ArrowUp", "KeyW", "Space"].includes(event.code))
        jump();
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === "ArrowLeft" || event.code === "KeyA")
        keys.left.pressed = false;
      if (event.code === "ArrowRight" || event.code === "KeyD")
        keys.right.pressed = false;
    };

    const handleBlur = () => {
      keys.left.pressed = false;
      keys.right.pressed = false;
    };

    // Retry music playback during mouse or touch interaction.
    const handlePointerDown = () => {
      tryStartMusic();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("pointerdown", handlePointerDown);

    const animate = () => {
      animationFrame = window.requestAnimationFrame(animate);
      if (!images || !context) return;

      context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      context.fillStyle = "#82cfff";
      context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      genericObjects.forEach((object) => object.draw(context));
      decorativeObjects.forEach((object) => object.draw(context));
      platforms.forEach((platform) => platform.draw(context));

      if (currentStatus === "playing") {
        const previousPlayerBottom = player.position.y + player.height;
        player.update(context, images, keys);

        if (keys.right.pressed && player.position.x < 400) {
          player.velocity.x = player.speed;
        } else if (keys.left.pressed && player.position.x > 100) {
          player.velocity.x = -player.speed;
        } else {
          player.velocity.x = 0;

          if (keys.right.pressed) {
            scrollOffset += player.speed;
            platforms.forEach(
              (platform) => (platform.position.x -= player.speed),
            );
            genericObjects.forEach(
              (object) => (object.position.x -= player.speed * 0.43),
            );
            decorativeObjects.forEach(
              (object) => (object.position.x -= player.speed),
            );
          } else if (keys.left.pressed && scrollOffset > 0) {
            const scrollAmount = Math.min(player.speed, scrollOffset);
            scrollOffset -= scrollAmount;
            platforms.forEach(
              (platform) => (platform.position.x += scrollAmount),
            );
            genericObjects.forEach(
              (object) => (object.position.x += scrollAmount * 0.43),
            );
            decorativeObjects.forEach(
              (object) => (object.position.x += scrollAmount),
            );
          }
        }

        player.canJump = false;
        platforms.forEach((platform) => {
          const currentPlayerBottom = player.position.y + player.height;
          const crossedPlatform =
            previousPlayerBottom <= platform.position.y &&
            currentPlayerBottom >= platform.position.y;
          const overlapsHorizontally =
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width;

          if (
            player.velocity.y >= 0 &&
            crossedPlatform &&
            overlapsHorizontally
          ) {
            player.position.y = platform.position.y - player.height;
            player.velocity.y = 0;
            player.canJump = true;
          }
        });

        if (scrollOffset >= level.finishAt) changeStatus("won");
        else if (player.position.y > CANVAS_HEIGHT) changeStatus("lost");
      } else {
        player.draw(context, images, keys);
      }

      if (currentStatus === "won") {
        context.fillStyle = "rgba(4, 12, 25, 0.22)";
        context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      }
    };

    loadImages()
      .then((loadedImages) => {
        if (disposed) return;
        images = loadedImages;
        resetGame();
        animationFrame = window.requestAnimationFrame(animate);
      })
      .catch((error: unknown) => {
        if (disposed) return;
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "There was a problem loading the game images.",
        );
        changeStatus("error");
      });

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("pointerdown", handlePointerDown);

      // Stop audio when leaving the current level.
      musicAudio.pause();
      jumpAudio.pause();
      keys.left.pressed = false;
      keys.right.pressed = false;
      gameActionsRef.current = null;
    };
  }, [levelId]);

  const showOverlay =
    status === "paused" ||
    status === "won" ||
    status === "lost" ||
    status === "loading" ||
    status === "error";

  return (
    <main className="game-page min-h-screen bg-gradient-to-b from-[#72d7fa] via-[#b7edff] to-[#fff0c6] px-3 py-5 font-mono text-[#17243d] sm:px-6 sm:py-8">
      <div className="mx-auto max-w-6xl">
        <header className="game-header mb-6 flex flex-wrap items-center justify-between gap-4 border-4 border-[#17243d] bg-[#fff3cb] p-4 shadow-[6px_6px_0_#17243d]">
          <div>
            <Link
              href="/levels"
              className="text-sm font-semibold text-slate-400 transition hover:text-white"
            >
              ← All levels
            </Link>
            <h1 className="mt-2 text-2xl font-black uppercase tracking-tight text-[#17243d] sm:text-3xl">
              {levelTitle}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => gameActionsRef.current?.togglePause()}
              disabled={
                status === "loading" ||
                status === "error" ||
                status === "won" ||
                status === "lost"
              }
              className="border-4 border-[#17243d] bg-white px-4 py-2.5 text-sm font-black text-[#17243d] shadow-[4px_4px_0_#17243d] transition hover:bg-[#ffe36c] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {status === "paused" ? "Resume" : "Pause"}
            </button>
            <button
              type="button"
              onClick={() => gameActionsRef.current?.restart()}
              disabled={status === "loading" || status === "error"}
              className="border-4 border-[#17243d] bg-[#ed4646] px-4 py-2.5 text-sm font-black text-white shadow-[4px_4px_0_#17243d] transition hover:bg-[#ff5b54] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Restart
            </button>
          </div>
        </header>

        <section className="game-screen relative mx-auto w-full max-w-[1024px] overflow-hidden border-[6px] border-[#17243d] bg-[#65c9f4] shadow-[8px_8px_0_#17243d]">
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            aria-label={`${levelTitle} platform game. Use arrow keys or A and D to move and W, Up, or Space to jump.`}
            className="block h-auto w-full touch-none [image-rendering:pixelated]"
          />

          {showOverlay && (
            <div className="absolute inset-0 grid place-items-center bg-[#07101e]/75 p-5 backdrop-blur-sm">
              <div className="w-full max-w-md border-4 border-[#ffe36c] bg-[#14213d]/[.97] p-7 text-center text-white shadow-[8px_8px_0_rgba(0,0,0,0.4)] sm:p-9">
                {status === "loading" ? (
                  <>
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-sky-300">
                      Preparing the course
                    </p>
                    <h2 className="mt-3 text-3xl font-black">Loading game…</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      Getting your sprites and platforms ready.
                    </p>
                  </>
                ) : status === "error" ? (
                  <>
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-red-300">
                      Something went wrong
                    </p>
                    <h2 className="mt-3 text-3xl font-black">
                      Could not start
                    </h2>
                    <p className="mt-3 break-words text-sm leading-6 text-slate-300">
                      {errorMessage}
                    </p>
                    <p className="mt-3 text-xs leading-5 text-slate-500">
                      Make sure the nine image files are directly inside your
                      public folder, with the same spelling and capitalization.
                    </p>
                  </>
                ) : status === "paused" ? (
                  <>
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-200">
                      Take a breather
                    </p>
                    <h2 className="mt-3 text-3xl font-black">Game paused</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      Your progress in this run is saved. Jump back in when
                      you’re ready.
                    </p>
                    <button
                      type="button"
                      onClick={() => gameActionsRef.current?.togglePause()}
                      className="mt-6 rounded-xl bg-red-500 px-6 py-3 font-bold transition hover:bg-red-400"
                    >
                      Resume game
                    </button>
                  </>
                ) : status === "won" ? (
                  <>
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-300">
                      Course complete
                    </p>
                    <h2 className="mt-3 text-4xl font-black">You win!</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      Nice run through {levelTitle}. Ready to try another
                      course?
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => gameActionsRef.current?.restart()}
                        className="rounded-xl bg-red-500 px-5 py-3 font-bold transition hover:bg-red-400"
                      >
                        Play again
                      </button>
                      <Link
                        href="/levels"
                        className="rounded-xl border border-white/15 px-5 py-3 font-bold transition hover:bg-white/10"
                      >
                        Choose level
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-red-300">
                      Missed a jump
                    </p>
                    <h2 className="mt-3 text-4xl font-black">Try again!</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      Mario fell off the course. Restart this level and give it
                      another shot.
                    </p>
                    <button
                      type="button"
                      onClick={() => gameActionsRef.current?.restart()}
                      className="mt-6 rounded-xl bg-red-500 px-6 py-3 font-bold transition hover:bg-red-400"
                    >
                      Restart level
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between p-3 text-[10px] font-black uppercase tracking-[0.16em] text-white/65 sm:p-4 sm:text-xs">
            <span className="rounded-lg bg-black/25 px-2 py-1">
              Move: A / D or ← / →
            </span>
            <span className="rounded-lg bg-black/25 px-2 py-1">
              Jump: W / ↑ / Space
            </span>
          </div>
        </section>

        <div className="game-tip mt-3 flex items-center justify-between gap-3 text-xs text-slate-500 sm:text-sm">
          <span>Tip: hold a direction to run, then jump before a gap.</span>
          <span className="hidden sm:inline">Level {levelId} / 3</span>
        </div>

        <div className="game-touch-controls mt-4 grid grid-cols-3 gap-3">
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Move left"
              onPointerDown={(event) => {
                event.preventDefault();
                event.currentTarget.setPointerCapture(event.pointerId);
                keysRef.current.left.pressed = true;
              }}
              onPointerUp={() => {
                keysRef.current.left.pressed = false;
              }}
              onPointerCancel={() => {
                keysRef.current.left.pressed = false;
              }}
              onLostPointerCapture={() => {
                keysRef.current.left.pressed = false;
              }}
              className="h-14 flex-1 border-4 border-[#17243d] bg-[#fff3cb] text-2xl font-black text-[#17243d] shadow-[4px_4px_0_#17243d] active:translate-y-1 active:shadow-none"
            >
              ◀
            </button>
            <button
              type="button"
              aria-label="Move right"
              onPointerDown={(event) => {
                event.preventDefault();
                event.currentTarget.setPointerCapture(event.pointerId);
                keysRef.current.right.pressed = true;
              }}
              onPointerUp={() => {
                keysRef.current.right.pressed = false;
              }}
              onPointerCancel={() => {
                keysRef.current.right.pressed = false;
              }}
              onLostPointerCapture={() => {
                keysRef.current.right.pressed = false;
              }}
              className="h-14 flex-1 border-4 border-[#17243d] bg-[#fff3cb] text-2xl font-black text-[#17243d] shadow-[4px_4px_0_#17243d] active:translate-y-1 active:shadow-none"
            >
              ▶
            </button>
          </div>
          <div />
          <button
            type="button"
            aria-label="Jump"
            onPointerDown={(event) => {
              event.preventDefault();
              gameActionsRef.current?.jump();
            }}
            className="h-14 border-4 border-[#17243d] bg-[#ed4646] text-2xl font-black text-white shadow-[4px_4px_0_#17243d] active:translate-y-1 active:shadow-none"
          >
            ▲
          </button>
        </div>
      </div>
    </main>
  );
}
