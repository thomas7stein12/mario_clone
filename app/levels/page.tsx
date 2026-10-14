import Image from "next/image";
import Link from "next/link";
import { levels } from "../game/level-data";

const difficultyStyles: Record<string, string> = {
  Easy: "bg-[#73c951] text-[#16371b]",
  Medium: "bg-[#ffe36c] text-[#493500]",
  Hard: "bg-[#ed4646] text-white",
};

const scenes = [
  {
    world: "WORLD 1-1",
    sky: "bg-[#77d3f5]",
    playerLeft: "16%",
    platforms: [
      { left: "10%", bottom: "28%", width: "30%" },
      { left: "49%", bottom: "45%", width: "26%" },
      { left: "72%", bottom: "28%", width: "20%" },
    ],
  },
  {
    world: "WORLD 2-1",
    sky: "bg-[#9cddfa]",
    playerLeft: "12%",
    platforms: [
      { left: "8%", bottom: "28%", width: "20%" },
      { left: "34%", bottom: "43%", width: "24%" },
      { left: "65%", bottom: "57%", width: "23%" },
    ],
  },
  {
    world: "WORLD 3-1",
    sky: "bg-[#b3c9f6]",
    playerLeft: "10%",
    platforms: [
      { left: "7%", bottom: "30%", width: "18%" },
      { left: "32%", bottom: "49%", width: "20%" },
      { left: "60%", bottom: "36%", width: "17%" },
      { left: "77%", bottom: "58%", width: "17%" },
    ],
  },
];

export default function LevelsPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#68cdf4] font-mono text-[#17243d]">
      {/* Sky and scenery */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#65cafa] via-[#b3eaff] to-[#fff0c1]" />

        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: "url('/background.png')",
            backgroundPosition: "center top",
            backgroundSize: "cover",
          }}
        />

        <div
          className="absolute inset-x-0 bottom-0 h-44 opacity-80"
          style={{
            backgroundImage: "url('/hills.png')",
            backgroundPosition: "center bottom",
            backgroundRepeat: "repeat-x",
            backgroundSize: "auto 100%",
          }}
        />
      </div>

      {/* Top navigation */}
      <header className="border-b-4 border-[#17243d] bg-[#fff3cb]/95 px-5 py-4 shadow-[0_5px_0_#17243d] sm:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center border-4 border-[#17243d] bg-[#ed4646] text-xl font-black text-white shadow-[4px_4px_0_#17243d]">
              M
            </span>
            <span className="text-sm font-black uppercase tracking-wide">
              Mario Adventure
            </span>
          </Link>

          <Link
            href="/"
            className="border-4 border-[#17243d] bg-white px-3 py-2 text-xs font-black uppercase shadow-[4px_4px_0_#17243d] transition hover:bg-[#ffe36c] sm:px-5"
          >
            ← Main Menu
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-10 sm:py-14">
        {/* Page heading */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-4 inline-block border-4 border-[#17243d] bg-[#ffe36c] px-3 py-2 text-xs font-black uppercase tracking-widest shadow-[4px_4px_0_#17243d]">
              Select your world
            </p>

            <h1 className="text-4xl font-black uppercase leading-none tracking-tight text-white [text-shadow:4px_4px_0_#17243d] sm:text-6xl">
              Choose a level!
            </h1>

            <p className="mt-5 max-w-2xl text-sm font-bold leading-7 sm:text-base">
              Three worlds. Three challenges. How far can you get?
            </p>
          </div>

          <div className="border-4 border-[#17243d] bg-[#fff3cb] px-5 py-3 text-xs font-black uppercase shadow-[5px_5px_0_#17243d]">
            <span className="text-[#ed4646]">Player 1</span>
            <span className="ml-3">Ready</span>
          </div>
        </div>

        {/* Course cards */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {levels.map((level, index) => {
            const scene = scenes[index % scenes.length];

            return (
              <article
                key={level.id}
                className="group flex flex-col border-4 border-[#17243d] bg-[#fff5d8] shadow-[8px_8px_0_#17243d] transition duration-200 hover:-translate-y-1 hover:shadow-[10px_10px_0_#17243d]"
              >
                {/* Miniature level preview */}
                <div
                  className={`relative h-48 overflow-hidden border-b-4 border-[#17243d] ${scene.sky}`}
                >
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: "url('/background.png')",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  />

                  <div className="absolute left-3 top-3 z-20 border-2 border-[#17243d] bg-[#fff3cb] px-2 py-1 text-[10px] font-black">
                    {scene.world}
                  </div>

                  {/* Coins */}
                  <div className="absolute left-[47%] top-[25%] z-10 h-7 w-5 rounded-[50%] border-[3px] border-[#b9780d] bg-[#ffe36c] shadow-[inset_3px_0_0_#fff7b5]" />
                  <div className="absolute left-[58%] top-[25%] z-10 h-7 w-5 rounded-[50%] border-[3px] border-[#b9780d] bg-[#ffe36c] shadow-[inset_3px_0_0_#fff7b5]" />

                  {/* Hills */}
                  <div
                    className="absolute inset-x-0 bottom-7 h-[42%] opacity-90"
                    style={{
                      backgroundImage: "url('/hills.png')",
                      backgroundPosition: "center bottom",
                      backgroundRepeat: "repeat-x",
                      backgroundSize: "auto 100%",
                    }}
                  />

                  {/* Platforms */}
                  {scene.platforms.map((platform, platformIndex) => (
                    <div
                      key={platformIndex}
                      className="absolute z-10 h-4 border-2 border-[#17243d] bg-[#d99032] before:absolute before:inset-x-0 before:-top-1 before:h-1 before:bg-[#73c951]"
                      style={{
                        left: platform.left,
                        bottom: platform.bottom,
                        width: platform.width,
                      }}
                    />
                  ))}

                  {/* Mario */}
                  <Image
                    src="/mario-stationary.png"
                    alt=""
                    width={45}
                    height={45}
                    className="absolute bottom-7 z-10 h-[45px] w-[45px] [image-rendering:pixelated]"
                    style={{ left: scene.playerLeft }}
                  />

                  {/* Ground */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-7 border-t-4 border-[#17243d] bg-[#a96b32]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(90deg, transparent 0 24px, rgba(23,36,61,.3) 24px 27px)",
                    }}
                  />
                </div>

                {/* Level information */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="border-2 border-[#17243d] bg-[#ffe36c] px-2 py-1 text-xs font-black">
                      LEVEL 0{index + 1}
                    </span>

                    <span
                      className={`border-2 border-[#17243d] px-3 py-1 text-[10px] font-black uppercase ${difficultyStyles[level.difficulty] ?? "bg-white text-[#17243d]"}`}
                    >
                      {level.difficulty}
                    </span>
                  </div>

                  <p className="mt-5 text-[10px] font-black uppercase tracking-widest text-[#67758b]">
                    {level.subtitle}
                  </p>

                  <h2 className="mt-2 text-xl font-black uppercase leading-tight sm:text-2xl">
                    {level.title}
                  </h2>

                  <p className="mt-3 flex-1 text-xs font-bold leading-6 text-[#58667b] sm:text-sm">
                    {level.description}
                  </p>

                  <Link
                    href={`/game/${level.id}`}
                    className="mt-6 flex items-center justify-between border-4 border-[#17243d] bg-[#ed4646] px-4 py-3 text-xs font-black uppercase text-white shadow-[5px_5px_0_#17243d] transition hover:-translate-y-0.5 hover:bg-[#ff5b54] active:translate-y-0.5 active:shadow-[2px_2px_0_#17243d]"
                  >
                    <span>Play Level</span>
                    <span className="text-lg">▶</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 border-4 border-[#17243d] bg-[#fff3cb] p-4 text-center text-xs font-black leading-6 shadow-[5px_5px_0_#17243d] sm:text-sm">
          CONTROLS: A / D OR ← / → TO MOVE
          <span className="mx-3 text-[#ed4646]">★</span>W / ↑ / SPACE TO JUMP
        </div>
      </div>
    </main>
  );
}
