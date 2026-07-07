import { Gamepad2 } from 'lucide-react';
import { flattenTagGroups, type Project, type TechTagGroup } from './types';

const autochessTagGroups = [
  {
    label: 'Runtime core',
    tags: ['C++20', 'CMake', 'vcpkg'],
  },
  {
    label: 'Platform + rendering',
    tags: ['SDL2', 'OpenGL', 'Direct3D 12'],
  },
  {
    label: 'Gameplay data',
    tags: ['Lua', 'sol2', 'JSON'],
  },
] satisfies TechTagGroup[];

export const autochessProject: Project = {
  name: 'Pokemon Autochess',
  status: 'Engine prototype',
  track: 'Systems-heavy game prototype',
  audience: 'Strategy game experiments and engine work',
  labRole: 'C++ systems learning lab',
  labTrack: 'Game/runtime prototype',
  deliverySurface: 'Game loop architecture, combat simulation, scripting, rendering experiments, tests, and tooling.',
  productConstraint:
    'A game prototype needs fast iteration, deterministic runtime behavior, renderer flexibility, content validation, and tests that keep experiments honest.',
  summary:
    'An engine-first C++20 auto-battler prototype with SDL2 platform work, OpenGL and Direct3D 12 rendering, Lua gameplay, VFX tooling, content pipelines, and tests.',
  details:
    'Autochess is a learning-focused runtime systems project: the current game is one client of reusable engine work around board state, combat simulation, renderer parity, scripting, data cooking, tooling, and packaged tests.',
  proof: [
    {
      label: 'Engine layers',
      text: 'CMake targets separate engine core, platform, rendering, runtime, VFX support, game objects, executable, tools, tests, and aggregate builds.',
    },
    {
      label: 'Rendering',
      text: 'The project maintains OpenGL and Direct3D 12 backend work with shared presentation rules, shader/resource caches, model loading, and smoke paths.',
    },
    {
      label: 'Gameplay runtime',
      text: 'GameRuntime and GameSession wire placement, combat, rounds, shop, movement, bench/cards, unit interaction, UI, battle feed, and health bars.',
    },
    {
      label: 'Tooling',
      text: 'VFX previewers, JSON config validation, content cooking, packaged bundles, release scripts, installer support, and headless tests support repeatable iteration.',
    },
  ],
  repositorySignals: [
    {
      label: 'C++ stack',
      text: 'The vcpkg manifest includes SDL2, SDL2_ttf, glad, GLM, Lua, sol2, nlohmann-json, fastgltf, and stb.',
    },
    {
      label: 'Game scripting',
      text: 'Lua scripts drive combat timing, shop roll logic, UI/debug events, state flow, phase transitions, and tuning overrides.',
    },
    {
      label: 'Test posture',
      text: 'The repo includes headless smoke tests, invariants, optional GL smoke draw, optional runtime smoke, CI build/test/data validation, and debug state snapshots.',
    },
  ],
  nextSteps: [
    {
      label: 'Next build',
      text: 'The prototype needs more playable content: additional 3D Pokemon models, attacks, mechanics, VFX, and staged encounters that move closer to a Kanto-inspired progression.',
    },
    {
      label: 'Blocker',
      text: 'The main constraint is the 3D world, VFX, and content layer. The runtime has useful systems, but a complete game needs authored stages, richer assets, visual feedback, tuning, and playtesting.',
    },
    {
      label: 'Product path',
      text: 'The right direction is to keep engine work tied to visible gameplay stages so rendering, scripting, combat, and VFX improvements stay grounded in playable behavior.',
    },
  ],
  tags: flattenTagGroups(autochessTagGroups),
  tagGroups: autochessTagGroups,
  href: 'https://github.com/AdamWentworth/PokemonAutochess',
  icon: Gamepad2,
  accent: 'autochess',
  brand: {
    alt: 'Pokemon Autochess',
    icon: '/products/pokemon-autochess/autochess-mark-transparent.png',
    iconFrame: 'dark',
    lockupFrame: 'dark',
    wordmark: '/products/pokemon-autochess/autochess-wordmark-transparent.png',
    darkLockup: '/products/pokemon-autochess/autochess-mark-alt-transparent.png',
  },
  demo: {
    kind: 'autochess',
    label: 'Runtime combat sandbox',
    metric: 'Engine systems',
    summary:
      'A captured engine prototype showing starter units, evolution-line staging, Route 1 combat, and debug roster scale.',
    steps: ['Stage starters', 'Resolve Route 1 combat', 'Inspect debug rosters'],
    scenes: [
      {
        label: 'Starter staging',
        text: 'Show Bulbasaur, Charmander, and Squirtle together and individually across the current evolution-line coverage.',
      },
      {
        label: 'Route 1 combat',
        text: 'Capture level-1 starter encounters against Pidgey and Rattata with health bars, combat HUD, and battle feed.',
      },
      {
        label: 'Debug roster',
        text: 'Use repeatable snapshots to present denser board states until the game receives upgraded authored content.',
      },
    ],
  },
};
