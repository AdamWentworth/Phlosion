import type { SimpleIcon } from 'simple-icons';
import {
  siApachekafka,
  siAstro,
  siAvaloniaui,
  siCmake,
  siCplusplus,
  siCss,
  siDocker,
  siDotnet,
  siExpress,
  siExpo,
  siFastapi,
  siGo,
  siGithubactions,
  siJson,
  siLinux,
  siLua,
  siMongodb,
  siMysql,
  siNginx,
  siNodedotjs,
  siNextdotjs,
  siOllama,
  siOpengl,
  siPostgresql,
  siPython,
  siReact,
  siSqlite,
  siTauri,
  siTailwindcss,
  siTypescript,
  siVercel,
} from 'simple-icons';

export type CustomTechIcon =
  | 'binary'
  | 'csharp'
  | 'direct3d'
  | 'fiber'
  | 'gamecube'
  | 'http'
  | 'package'
  | 'packageCheck'
  | 'sdl'
  | 'voice'
  | 'windows'
  | 'chi';

export type TechIconDefinition =
  | {
      kind: 'simple';
      icon: SimpleIcon;
    }
  | {
      kind: 'image';
      src: string;
      alt: string;
      color: string;
      className?: string;
    }
  | {
      kind: 'custom';
      custom: CustomTechIcon;
      color: string;
    };

const simpleTechIcons: Record<string, SimpleIcon> = {
  'Apache Kafka': siApachekafka,
  Astro: siAstro,
  AvaloniaUI: siAvaloniaui,
  'C++20': siCplusplus,
  CMake: siCmake,
  Docker: siDocker,
  CSS: siCss,
  '.NET 10': siDotnet,
  Expo: siExpo,
  Express: siExpress,
  FastAPI: siFastapi,
  Go: siGo,
  'GitHub Actions': siGithubactions,
  JSON: siJson,
  Kafka: siApachekafka,
  Linux: siLinux,
  Lua: siLua,
  MongoDB: siMongodb,
  MySQL: siMysql,
  NGINX: siNginx,
  'Next.js': siNextdotjs,
  Node: siNodedotjs,
  'Node.js': siNodedotjs,
  Ollama: siOllama,
  OpenGL: siOpengl,
  Postgres: siPostgresql,
  'Postgres/PostGIS': siPostgresql,
  PostgreSQL: siPostgresql,
  Python: siPython,
  React: siReact,
  SQLite: siSqlite,
  Tauri: siTauri,
  'Tailwind CSS': siTailwindcss,
  TypeScript: siTypescript,
  Vercel: siVercel,
};

const imageTechIcons: Record<string, Extract<TechIconDefinition, { kind: 'image' }>> = {
  'llama.cpp': {
    kind: 'image',
    src: '/tech/llamacpp-logo.svg',
    alt: '',
    color: '#ff8236',
    className: 'tech-icon-image-llama',
  },
  sol2: {
    kind: 'image',
    src: '/tech/sol2-logo.png',
    alt: '',
    color: '#ffb300',
    className: 'tech-icon-image-sol2',
  },
  Vitest: {
    kind: 'image',
    src: '/tech/vitest-logo.svg',
    alt: '',
    color: '#729b1b',
    className: 'tech-icon-image-vitest',
  },
  Vite: {
    kind: 'image',
    src: '/tech/vite-logo.svg',
    alt: '',
    color: '#9162ff',
    className: 'tech-icon-image-vite',
  },
  vcpkg: {
    kind: 'image',
    src: '/tech/vcpkg-logo.svg',
    alt: '',
    color: '#f9c438',
    className: 'tech-icon-image-vcpkg',
  },
};

const customTechIcons: Record<string, Extract<TechIconDefinition, { kind: 'custom' }>> = {
  'Binary formats': { kind: 'custom', custom: 'binary', color: '#345b7c' },
  'C#': { kind: 'custom', custom: 'csharp', color: '#7a3fb0' },
  'Direct3D 12': { kind: 'custom', custom: 'direct3d', color: '#10893e' },
  Fiber: { kind: 'custom', custom: 'fiber', color: '#00add8' },
  'GameCube ISO': { kind: 'custom', custom: 'gamecube', color: '#5f4bb6' },
  'net/http': { kind: 'custom', custom: 'http', color: '#00add8' },
  'Release packaging': { kind: 'custom', custom: 'packageCheck', color: '#b94d00' },
  SDL2: { kind: 'custom', custom: 'sdl', color: '#17395f' },
  'Whisper ASR': { kind: 'custom', custom: 'voice', color: '#ff5a00' },
  Windows: { kind: 'custom', custom: 'windows', color: '#0078d4' },
  chi: { kind: 'custom', custom: 'chi', color: '#00a650' },
};

export function getTechIcon(label: string): TechIconDefinition | null {
  const imageIcon = imageTechIcons[label];
  if (imageIcon) {
    return imageIcon;
  }

  const simpleIcon = simpleTechIcons[label];
  if (simpleIcon) {
    return {
      kind: 'simple',
      icon: simpleIcon,
    };
  }

  return customTechIcons[label] ?? null;
}
