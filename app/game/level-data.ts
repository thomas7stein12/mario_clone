export type PlatformDefinition = {
  type: "ground" | "small";
  x: number;
  y: number;
};

export type LevelDefinition = {
  id: string;
  title: string;
  subtitle: string;
  difficulty: string;
  description: string;
  finishAt: number;
  platforms: PlatformDefinition[];
};

export const levels: LevelDefinition[] = [
  {
    id: "1",
    title: "Mushroom Meadow",
    subtitle: "The original course",
    difficulty: "Easy",
    description: "Your original platform layout, now inside the level system.",
    finishAt: 5000,
    platforms: [
      { type: "small", x: 350, y: 275 },
      { type: "small", x: 639, y: 80 },
      { type: "small", x: 639, y: 275 },
      { type: "small", x: 928, y: 275 },
      { type: "ground", x: -1, y: 451 },
      { type: "ground", x: 778, y: 451 },
      { type: "small", x: 1600, y: 351 },
      { type: "small", x: 2100, y: 351 },
      { type: "small", x: 2900, y: 230 },
      { type: "small", x: 3350, y: 51 },
      { type: "small", x: 3278, y: 370 },
      { type: "small", x: 3350, y: 370 },
      { type: "ground", x: 2600, y: 451 },
      { type: "ground", x: 3179, y: 451 },
      { type: "small", x: 4200, y: 551 },
      { type: "ground", x: 4800, y: 451 },
      { type: "ground", x: 5378, y: 451 },
    ],
  },
  {
    id: "2",
    title: "Skyline Sprint",
    subtitle: "Higher jumps, longer gaps",
    difficulty: "Medium",
    description: "A new route with raised platforms and a few longer jumps.",
    finishAt: 5500,
    platforms: [
      { type: "ground", x: -1, y: 451 },
      { type: "small", x: 300, y: 330 },
      { type: "small", x: 620, y: 250 },
      { type: "ground", x: 760, y: 451 },
      { type: "small", x: 950, y: 320 },
      { type: "small", x: 1250, y: 200 },
      { type: "ground", x: 1550, y: 451 },
      { type: "small", x: 1770, y: 300 },
      { type: "small", x: 2050, y: 175 },
      { type: "small", x: 2300, y: 290 },
      { type: "ground", x: 2450, y: 451 },
      { type: "small", x: 2780, y: 350 },
      { type: "small", x: 3000, y: 210 },
      { type: "ground", x: 3300, y: 451 },
      { type: "small", x: 3600, y: 280 },
      { type: "small", x: 3850, y: 140 },
      { type: "ground", x: 4200, y: 451 },
      { type: "small", x: 4500, y: 300 },
      { type: "small", x: 4750, y: 180 },
      { type: "ground", x: 5100, y: 451 },
      { type: "small", x: 5300, y: 250 },
      { type: "small", x: 5600, y: 350 },
    ],
  },
  {
    id: "3",
    title: "Pipeworks Pass",
    subtitle: "A trickier final run",
    difficulty: "Hard",
    description: "More vertical platforms and tighter landing spots. Watch your timing.",
    finishAt: 5900,
    platforms: [
      { type: "ground", x: -1, y: 451 },
      { type: "small", x: 320, y: 280 },
      { type: "small", x: 520, y: 190 },
      { type: "ground", x: 850, y: 451 },
      { type: "small", x: 1000, y: 320 },
      { type: "small", x: 1260, y: 220 },
      { type: "small", x: 1500, y: 130 },
      { type: "ground", x: 1700, y: 451 },
      { type: "small", x: 1900, y: 330 },
      { type: "small", x: 2150, y: 240 },
      { type: "small", x: 2400, y: 145 },
      { type: "ground", x: 2550, y: 451 },
      { type: "small", x: 2880, y: 300 },
      { type: "small", x: 3100, y: 210 },
      { type: "small", x: 3300, y: 120 },
      { type: "ground", x: 3500, y: 451 },
      { type: "small", x: 3800, y: 320 },
      { type: "small", x: 4030, y: 220 },
      { type: "ground", x: 4350, y: 451 },
      { type: "small", x: 4600, y: 320 },
      { type: "small", x: 4900, y: 210 },
      { type: "ground", x: 5200, y: 451 },
      { type: "small", x: 5500, y: 275 },
      { type: "ground", x: 6000, y: 451 },
    ],
  },
];

export function getLevelById(id: string) {
  return levels.find((level) => level.id === id);
}
