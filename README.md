# Mario Clone: Next.js integration files

These are the files to copy into your existing `mario_clone` Next.js app. They do not replace your `package.json`, TypeScript config, or Tailwind setup.

## 1. Copy the files

Copy this folder's `app` directory into the root of your project, merging with the existing `app` directory and replacing `app/layout.tsx` and `app/page.tsx` when prompted.

Files included:

- `app/layout.tsx` — site metadata and root layout
- `app/page.tsx` — landing page
- `app/levels/page.tsx` — level picker
- `app/game/level-data.ts` — all three platform layouts
- `app/game/[levelId]/page.tsx` — route for a selected level
- `app/game/[levelId]/GameCanvas.tsx` — canvas game, physics, keyboard/touch controls, pause, restart, win/loss states

## 2. Check the image filenames

The code expects these files directly inside `public/` (not inside `public/imgs/`):

```text
public/background.png
public/hills.png
public/platform.png
public/platformSmallTall.png
public/mario-left-1.png
public/mario-left-2.png
public/mario-right-1.png
public/mario-right-2.png
public/mario-stationary.png
```

The paths are case-sensitive on many deployment environments. Each filename above must match exactly.

## 3. Run it

From the project folder:

```bash
npm run dev
```

Open `http://localhost:3000`. The landing page leads to `/levels`, and each level opens at `/game/1`, `/game/2`, or `/game/3`.

No extra npm packages are required. Keep your existing `app/globals.css` and `package.json` as they are.

## Adding another level

Add another object to the `levels` array in `app/game/level-data.ts`. Give it a unique `id`, title, description, `finishAt` distance, and a `platforms` array. Each platform uses `type: "ground"` for `platform.png` or `type: "small"` for `platformSmallTall.png`. The level picker and static game routes are generated from this array.
