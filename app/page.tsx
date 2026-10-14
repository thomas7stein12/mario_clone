import Image from "next/image";
import Link from "next/link";

const controls = [
  { key: "A / D", title: "MOVE", detail: "Run left and right" },
  { key: "W / ↑", title: "JUMP", detail: "Clear the gaps" },
  { key: "SPACE", title: "SURVIVE", detail: "Watch your footing" },
];

export default function Home() {
  return (
    <main className="relative isolate flex min-h-screen flex-col overflow-hidden bg-[#65c9f4] font-mono text-[#17243d]">
      {/* Background artwork */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#63cafa] via-[#a8e8ff] to-[#f5f0c8]" />

        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage: "url('/background.png')",
            backgroundPosition: "center top",
            backgroundSize: "cover",
          }}
        />

        <div
          className="absolute inset-x-0 bottom-0 h-48 opacity-90"
          style={{
            backgroundImage: "url('/hills.png')",
            backgroundPosition: "center bottom",
            backgroundRepeat: "repeat-x",
            backgroundSize: "auto 100%",
          }}
        />
      </div>

      {/* Header */}
      <header className="border-b-4 border-[#17243d] bg-[#fff3cb]/95 px-5 py-4 shadow-[0_5px_0_#17243d] sm:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center border-4 border-[#17243d] bg-[#ed4646] text-2xl font-black text-white shadow-[4px_4px_0_#17243d]">
              M
            </span>
            <span className="text-sm font-black uppercase tracking-tight sm:text-lg">
              Mario
              <span className="block text-xs tracking-[0.25em] text-[#53647a]">
                Adventure
              </span>
            </span>
          </Link>

          <Link
            href="/levels"
            className="border-4 border-[#17243d] bg-white px-3 py-2 text-xs font-black uppercase shadow-[4px_4px_0_#17243d] transition hover:-translate-y-0.5 hover:bg-[#ffe36c] sm:px-5 sm:py-3"
          >
            Levels <span aria-hidden="true">→</span>
          </Link>
        </div>
      </header>

      {/* Main title screen */}
      <section className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 px-5 py-12 sm:px-10 sm:py-16 lg:grid-cols-2">
        <div className="relative z-10">
          <div className="mb-7 inline-flex items-center gap-3 border-4 border-[#17243d] bg-[#ffe36c] px-4 py-2 text-xs font-black uppercase tracking-widest shadow-[5px_5px_0_#17243d]">
            <span className="h-3 w-3 animate-pulse bg-[#ed4646]" />
            Player 1 · Ready?
          </div>

          <h1 className="font-black uppercase leading-[0.85] tracking-[-0.08em]">
            <span className="block text-6xl text-white [text-shadow:5px_5px_0_#17243d] sm:text-8xl xl:text-9xl">
              Mario
            </span>
            <span className="mt-4 block text-4xl text-[#ed4646] [text-shadow:3px_3px_0_#17243d] sm:text-6xl xl:text-7xl">
              Adventure!
            </span>
          </h1>

          <p className="mt-8 max-w-xl border-l-8 border-[#ed4646] bg-[#fff3cb]/90 px-5 py-4 text-sm font-bold leading-7 sm:text-base">
            Run, jump, and race across three platforming worlds. Time your
            jumps, avoid the gaps, and make it to the finish!
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link
              href="/levels"
              className="group inline-flex items-center gap-4 border-4 border-[#17243d] bg-[#ed4646] px-6 py-4 text-sm font-black uppercase text-white shadow-[7px_7px_0_#17243d] transition hover:-translate-y-1 hover:bg-[#ff5b54] hover:shadow-[9px_9px_0_#17243d] active:translate-y-1 active:shadow-[3px_3px_0_#17243d] sm:px-8 sm:text-base"
            >
              <span>Start Game</span>
              <span className="text-xl transition group-hover:translate-x-1">
                ▶
              </span>
            </Link>
            <span className="text-xs font-black uppercase leading-6 tracking-wide">
              3 Worlds
              <br />
              Endless Fun!
            </span>
          </div>

          {/* Control instructions */}
          <div className="mt-12 grid grid-cols-3 gap-3">
            {controls.map((control) => (
              <div
                key={control.key}
                className="border-4 border-[#17243d] bg-[#fff8dc] p-3 shadow-[4px_4px_0_#17243d] sm:p-4"
              >
                <div className="inline-block border-2 border-[#17243d] bg-[#ffe36c] px-2 py-1 text-[10px] font-black sm:text-xs">
                  {control.key}
                </div>
                <h2 className="mt-3 text-xs font-black sm:text-sm">
                  {control.title}
                </h2>
                <p className="mt-2 text-[10px] font-bold leading-4 text-[#56647a] sm:text-xs">
                  {control.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pixel-art game preview */}
        <div className="mx-auto w-full max-w-xl">
          <div className="border-4 border-[#17243d] bg-[#fff3cb] p-3 shadow-[10px_10px_0_#17243d] sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-3 border-b-4 border-[#17243d] pb-3 text-xs font-black uppercase">
              <span>World 1-1</span>
              <span className="flex items-center gap-2">
                <span className="inline-block h-5 w-5 rounded-full border-[3px] border-[#b9780d] bg-[#ffe36c] shadow-[inset_3px_0_0_#fff7b5]" />
                x 00
              </span>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden border-4 border-[#17243d] bg-[#73d1f5]">
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  backgroundImage: "url('/background.png')",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              />

              {/* Floating coins */}
              <div className="absolute left-[52%] top-[22%] h-8 w-6 rounded-[50%] border-[3px] border-[#b9780d] bg-[#ffe36c] shadow-[inset_4px_0_0_#fff7b5] sm:h-10 sm:w-7" />
              <div className="absolute left-[66%] top-[22%] h-8 w-6 rounded-[50%] border-[3px] border-[#b9780d] bg-[#ffe36c] shadow-[inset_4px_0_0_#fff7b5] sm:h-10 sm:w-7" />

              {/* Hills */}
              <div
                className="absolute inset-x-0 bottom-9 h-[35%] opacity-90"
                style={{
                  backgroundImage: "url('/hills.png')",
                  backgroundPosition: "center bottom",
                  backgroundRepeat: "repeat-x",
                  backgroundSize: "auto 100%",
                }}
              />

              {/* Platforms */}
              <div className="absolute bottom-[28%] left-[43%] h-5 w-[28%] border-4 border-[#17243d] bg-[#d99032] before:absolute before:inset-x-0 before:-top-1 before:h-2 before:bg-[#73c951]" />

              <div className="absolute bottom-[14%] left-[8%] h-5 w-[30%] border-4 border-[#17243d] bg-[#d99032] before:absolute before:inset-x-0 before:-top-1 before:h-2 before:bg-[#73c951]" />

              {/* Mario */}
              <Image
                src="/mario-stationary.png"
                alt=""
                width={60}
                height={60}
                priority
                className="absolute bottom-[13%] left-[17%] z-10 h-[60px] w-[60px] [image-rendering:pixelated] sm:h-[76px] sm:w-[76px]"
              />

              {/* Ground */}
              <div
                className="absolute inset-x-0 bottom-0 h-9 border-t-4 border-[#17243d] bg-[#9b632d]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, transparent 0 27px, rgba(23,36,61,.35) 27px 30px), repeating-linear-gradient(0deg, transparent 0 15px, rgba(23,36,61,.25) 15px 18px)",
                }}
              />
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 text-[10px] font-black uppercase tracking-wide sm:text-xs">
              <span>★ Your adventure awaits</span>
              <span className="animate-pulse text-[#ed4646]">Press start!</span>
            </div>
          </div>

          <div className="mt-7 flex justify-center gap-3">
            <span className="h-4 w-4 border-2 border-[#17243d] bg-[#ed4646]" />
            <span className="h-4 w-4 border-2 border-[#17243d] bg-[#ffe36c]" />
            <span className="h-4 w-4 border-2 border-[#17243d] bg-[#73c951]" />
            <span className="h-4 w-4 border-2 border-[#17243d] bg-[#fff3cb]" />
          </div>
        </div>
      </section>

      <footer className="border-t-4 border-[#17243d] bg-[#fff3cb] px-5 py-4 text-center text-[10px] font-black uppercase tracking-widest text-[#53647a] sm:text-xs">
        Mario Adventure · A retro platformer built with Next.js
      </footer>
    </main>
  );
}
