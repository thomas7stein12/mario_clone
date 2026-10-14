export type PlatformDefinition = {
  type: "ground" | "small";
  x: number;
  y: number;
};

export type DecorativeBlockDefinition = {
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
  decorativeBlocks?: DecorativeBlockDefinition[];
};

const DECORATIVE_BOTTOM_Y = 551;

// Generate decorative blocks below small platforms,
// continuing toward the bottom of the game screen.
function createDecorativeSupports(
  platforms: PlatformDefinition[],
): DecorativeBlockDefinition[] {
  return platforms.flatMap(({ type, x, y }) => {
    if (type !== "small") return [];

    const supports: DecorativeBlockDefinition[] = [];

    for (
      let supportY = y + 100;
      supportY <= DECORATIVE_BOTTOM_Y;
      supportY += 100
    ) {
      supports.push({ x, y: supportY });
    }

    return supports;
  });
}

function createLevel(level: LevelDefinition): LevelDefinition {
  return {
    ...level,
    decorativeBlocks: [
      ...(level.decorativeBlocks ?? []),
      ...createDecorativeSupports(level.platforms),
    ],
  };
}

export const levels: LevelDefinition[] = [

  createLevel({
    id: "1",
    title: "Mushroom Meadow",
    subtitle: "The original course",
    difficulty: "Hard",
    description: "Navigate through various barely possible jumps scattered across rolling hills.",
    finishAt: 30000,
    platforms: [
      // Section 1: The original meadow
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

      // Section 2: The edge of the meadow
      // Ordered from back to front for visual layering.

      // Highest platforms: background layer
      { type: "small", x: 7178, y: 51 },
      { type: "small", x: 9078, y: 51 },
      { type: "small", x: 7478, y: 51 },
      { type: "small", x: 10378, y: 51 },
      { type: "small", x: 13178, y: 51 },
      { type: "small", x: 9378, y: 51 },
      { type: "small", x: 10978, y: 51 },
      { type: "small", x: 13478, y: 51 },

      // Upper-middle platforms
      { type: "small", x: 7378, y: 151 },
      { type: "small", x: 9278, y: 151 },
      { type: "small", x: 7678, y: 151 },
      { type: "small", x: 13378, y: 151 },
      { type: "small", x: 9578, y: 151 },
      { type: "small", x: 7778, y: 151 },
      { type: "small", x: 10878, y: 151 },
      { type: "small", x: 13678, y: 151 },
      { type: "small", x: 9678, y: 151 },
      { type: "small", x: 11278, y: 151 },
      { type: "small", x: 13778, y: 151 },

      // Middle-height platforms
      { type: "small", x: 9578, y: 251 },
      { type: "small", x: 7678, y: 251 },
      { type: "small", x: 10878, y: 251 },
      { type: "small", x: 8078, y: 251 },
      { type: "small", x: 13678, y: 251 },
      { type: "small", x: 9978, y: 251 },
      { type: "small", x: 11578, y: 251 },
      { type: "small", x: 14078, y: 251 },

      // Lower-middle platforms
      { type: "small", x: 9278, y: 351 },
      { type: "small", x: 7378, y: 351 },
      { type: "small", x: 10578, y: 351 },
      { type: "small", x: 8678, y: 351 },
      { type: "small", x: 13378, y: 351 },
      { type: "small", x: 11878, y: 351 },
      { type: "small", x: 14378, y: 351 },

      // Foreground platforms
      { type: "small", x: 8978, y: 451 },
      { type: "small", x: 6778, y: 451 },
      { type: "small", x: 13078, y: 451 },
      { type: "small", x: 12478, y: 451 },

      // Lowest platforms: front layer
      { type: "small", x: 12778, y: 551 },
      { type: "small", x: 6178, y: 551 },
      { type: "small", x: 14578, y: 551 },

      { type: "ground", x: 15178, y: 451 },

      // Section 3: Beyond the meadow
      // A challenging route with deliberate elevation changes.

      // Opening climb
      { type: "small", x: 15750, y: 351 },
      { type: "small", x: 16100, y: 251 },
      { type: "small", x: 16450, y: 151 },
      { type: "small", x: 16800, y: 251 },
      { type: "small", x: 17150, y: 351 },
      { type: "small", x: 17500, y: 251 },
      { type: "small", x: 17750, y: 151 },

      // LONG JUMP 1
      // Barely achievable: 850 horizontal units and a 500-unit drop.
      { type: "small", x: 18000, y: 51 },
      { type: "small", x: 18850, y: 551 },

      // Recovery route
      { type: "small", x: 19400, y: 451 },
      { type: "small", x: 19800, y: 351 },
      { type: "small", x: 20200, y: 251 },
      { type: "small", x: 20600, y: 151 },

      // LONG JUMP 2
      // Same demanding distance, with another major elevation drop.
      { type: "small", x: 21000, y: 51 },
      { type: "small", x: 21850, y: 551 },

      // Climb back up through staggered platforms
      { type: "small", x: 22450, y: 451 },
      { type: "small", x: 22850, y: 351 },
      { type: "small", x: 23250, y: 251 },
      { type: "small", x: 23650, y: 151 },
      { type: "small", x: 24050, y: 251 },
      { type: "small", x: 24450, y: 351 },
      { type: "ground", x: 24850, y: 451 },

      // Final stretch
      { type: "small", x: 25400, y: 351 },
      { type: "small", x: 25800, y: 251 },
      { type: "small", x: 26200, y: 151 },
      { type: "small", x: 26600, y: 251 },
      { type: "small", x: 27000, y: 351 },
      { type: "small", x: 27400, y: 251 },
      { type: "small", x: 27800, y: 351 },
      { type: "small", x: 28100, y: 251 },
      { type: "small", x: 28400, y: 151 },

      // FINAL LONG JUMP
      // Same barely achievable 850-unit jump.
      // The landing platform is distant and far below the launch point.
      { type: "small", x: 28728, y: 51 },
      { type: "small", x: 29578, y: 551 },

      // Final approach to the finish
      { type: "ground", x: 30178, y: 451 },
    ],

    decorativeBlocks: [
      { x: 3350, y: 151 },
      { x: 500, y: 375 },
    ],
  }),

  // LEVEL 2: SKYLINE SPRINT
  createLevel({
    id: "2",
    title: "Skyline Sprint",
    subtitle: "Across the rooftops",
    difficulty: "Easy",
    description:
      "Race across staggered rooftops, climb tall structures, and find your way through a winding skyline.",
    finishAt: 7200,
    platforms: [
      // Back layer: highest rooftop platforms
      { type: "small", x: 5600, y: 50 },
      { type: "small", x: 1250, y: 50 },
      { type: "small", x: 3050, y: 50 },
      { type: "small", x: 1450, y: 50 },
      { type: "small", x: 5800, y: 50 },
      { type: "small", x: 2850, y: 50 },

      // Upper ledges: rooftop reversals and elevated crossings
      { type: "small", x: 4400, y: 150 },
      { type: "small", x: 1150, y: 150 },
      { type: "small", x: 3050, y: 150 },
      { type: "small", x: 5500, y: 150 },
      { type: "small", x: 1450, y: 150 },
      { type: "small", x: 2750, y: 150 },
      { type: "small", x: 6000, y: 150 },
      { type: "small", x: 1650, y: 150 },
      { type: "small", x: 5800, y: 150 },
      { type: "small", x: 3250, y: 150 },

      // Mid-height rooftops: the zigzag route
      { type: "small", x: 4150, y: 250 },
      { type: "small", x: 620, y: 250 },
      { type: "small", x: 5550, y: 250 },
      { type: "small", x: 2850, y: 250 },
      { type: "small", x: 1200, y: 250 },
      { type: "small", x: 6250, y: 250 },
      { type: "small", x: 2400, y: 250 },
      { type: "small", x: 1850, y: 250 },
      { type: "small", x: 3500, y: 250 },
      { type: "small", x: 4650, y: 250 },
      { type: "small", x: 6900, y: 250 },

      // Lower rooftops: drops, gaps, and landing approaches
      { type: "small", x: 4900, y: 350 },
      { type: "small", x: 300, y: 350 },
      { type: "small", x: 5300, y: 350 },
      { type: "small", x: 2150, y: 350 },
      { type: "small", x: 950, y: 350 },
      { type: "small", x: 3900, y: 350 },
      { type: "small", x: 6500, y: 350 },
      { type: "small", x: 2650, y: 350 },

      // Ground layer: lower foreground
      { type: "ground", x: -1, y: 451 },
      { type: "ground", x: 780, y: 451 },
      { type: "ground", x: 1950, y: 451 },
      { type: "ground", x: 3650, y: 451 },
      { type: "ground", x: 5050, y: 451 },
      { type: "ground", x: 6650, y: 451 },
      { type: "ground", x: 7200, y: 451 },
    ],
  }),

  // LEVEL 3: PIPEWORKS PASS
  createLevel({
    id: "3",
    title: "Pipeworks Pass",
    subtitle: "Up, over, and back again",
    difficulty: "Medium",
    description:
      "Navigate a maze of vertical shafts, awkward reversals, narrow landings, and difficult descents.",
    finishAt: 24000,


    platforms: [
      // Original level: highest platforms
      { type: "small", x: 3800, y: 40 },
      { type: "small", x: 4100, y: 40 },
      { type: "small", x: 6650, y: 60 },
      { type: "small", x: 6350, y: 60 },
      { type: "small", x: 5220, y: 65 },
      { type: "small", x: 1180, y: 70 },
      { type: "small", x: 980, y: 70 },
      { type: "small", x: 4920, y: 80 },
      { type: "small", x: 2730, y: 90 },
      { type: "small", x: 2430, y: 100 },
      { type: "small", x: 3950, y: 110 },
      { type: "small", x: 4100, y: 110 },

      // Original level: upper platforms
      { type: "small", x: 6500, y: 150 },
      { type: "small", x: 1300, y: 160 },
      { type: "small", x: 5250, y: 170 },
      { type: "small", x: 5050, y: 170 },
      { type: "small", x: 5440, y: 180 },
      { type: "small", x: 2600, y: 180 },
      { type: "small", x: 6840, y: 190 },
      { type: "small", x: 3900, y: 200 },
      { type: "small", x: 520, y: 200 },

      // Original level: middle platforms
      { type: "small", x: 2860, y: 240 },
      { type: "small", x: 5400, y: 240 },
      { type: "small", x: 6670, y: 250 },
      { type: "small", x: 5080, y: 260 },
      { type: "small", x: 1000, y: 270 },
      { type: "small", x: 1400, y: 280 },
      { type: "small", x: 2710, y: 280 },
      { type: "small", x: 3710, y: 290 },
      { type: "small", x: 6300, y: 290 },
      { type: "small", x: 6740, y: 300 },
      { type: "small", x: 2310, y: 300 },
      { type: "small", x: 320, y: 300 },

      // Original level: lower platforms
      { type: "small", x: 5300, y: 350 },
      { type: "small", x: 4900, y: 370 },
      { type: "small", x: 820, y: 370 },
      { type: "small", x: 6500, y: 370 },
      { type: "small", x: 3550, y: 380 },
      { type: "small", x: 6110, y: 390 },
      { type: "small", x: 2530, y: 390 },
      { type: "small", x: 2130, y: 400 },
      { type: "small", x: 7600, y: 451 },

      // Section 2: Beyond the first stretch
      // Scattered ledges with uneven spacing and changing heights
      { type: "small", x: 7890, y: 330 },
      { type: "small", x: 8210, y: 210 },
      { type: "small", x: 8470, y: 300 },
      { type: "small", x: 8860, y: 105 },
      { type: "small", x: 9160, y: 340 },
      { type: "small", x: 9470, y: 240 },

      // A broken stretch with a high ledge and a lower recovery route
      { type: "small", x: 9780, y: 375 },
      { type: "small", x: 10150, y: 200 },
      { type: "small", x: 10580, y: 100 },
      { type: "small", x: 10910, y: 260 },
      { type: "small", x: 11250, y: 350 },
      { type: "small", x: 11600, y: 180 },

      // Section 3: The scattered ridge
      // A few closely grouped ledges mixed with longer crossings
      { type: "small", x: 11920, y: 300 },
      { type: "small", x: 12280, y: 550 },
      { type: "small", x: 12620, y: 235 },
      { type: "small", x: 12990, y: 80 },
      { type: "small", x: 12860, y: 180 },
      { type: "small", x: 13100, y: 370 },
      { type: "small", x: 13730, y: 180 },
      { type: "small", x: 14380, y: 275 },

      // A lower route interrupted by isolated higher platforms
      { type: "small", x: 14700, y: 80 },
      { type: "small", x: 15030, y: 210 },
      { type: "small", x: 15360, y: 390 },
      { type: "small", x: 15720, y: 270 },
      { type: "small", x: 16080, y: 125 },
      { type: "small", x: 16400, y: 330 },

      // Section 4: The broken crossing
      // Irregular clusters rather than a continuous staircase
      { type: "small", x: 16750, y: 215 },
      { type: "small", x: 17110, y: 105 },
      { type: "small", x: 17790, y: 265 },
      { type: "small", x: 18150, y: 350 },
      { type: "small", x: 18500, y: 180 },
      { type: "small", x: 18830, y: 300 },
      { type: "small", x: 19180, y: 130 },

      // Uneven ledges leading into the final stretch
      { type: "small", x: 19500, y: 230 },
      { type: "small", x: 19850, y: 380 },
      { type: "small", x: 20210, y: 290 },
      { type: "small", x: 20550, y: 145 },
      { type: "small", x: 20900, y: 340 },

      // Section 5: Final stretch
      // A mix of low platforms, sudden climbs, and awkward landings
      { type: "small", x: 21230, y: 200 },
      { type: "small", x: 21580, y: 90 },
      { type: "small", x: 22100, y: 280 },
      { type: "small", x: 22600, y: 160 },
      { type: "small", x: 22950, y: 260 },
      { type: "small", x: 23300, y: 95 },
      { type: "small", x: 23650, y: 315 },
      { type: "small", x: 23920, y: 390 },

      // Ground: original landing areas
      { type: "ground", x: -1, y: 451 },
      { type: "ground", x: 1500, y: 451 },
      { type: "ground", x: 2900, y: 451 },
      { type: "ground", x: 4250, y: 451 },
      { type: "ground", x: 5500, y: 451 },
      { type: "ground", x: 6800, y: 451 },

      // New recovery areas, spaced unevenly throughout the course
      { type: "ground", x: 8150, y: 451 },
      { type: "ground", x: 9570, y: 451 },
      { type: "ground", x: 11090, y: 451 },
      { type: "ground", x: 12750, y: 451 },
      { type: "ground", x: 14150, y: 451 },
      { type: "ground", x: 16050, y: 451 },
      { type: "ground", x: 17500, y: 451 },
      { type: "ground", x: 19350, y: 451 },
      { type: "ground", x: 20800, y: 451 },
      { type: "ground", x: 22650, y: 451 },

      // Finish area
      { type: "ground", x: 24178, y: 451 },
    ],

  }),
];

export function getLevelById(id: string) {
  return levels.find((level) => level.id === id);
}
