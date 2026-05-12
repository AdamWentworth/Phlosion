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
  siReactrouter,
  siSqlite,
  siTauri,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVite,
  siVitest,
} from 'simple-icons';

export type CustomTechIcon =
  | 'binary'
  | 'csharp'
  | 'direct3d'
  | 'fiber'
  | 'gamecube'
  | 'http'
  | 'package'
  | 'sdl'
  | 'voice'
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
  'React Router': siReactrouter,
  SQLite: siSqlite,
  Tauri: siTauri,
  'Tailwind CSS': siTailwindcss,
  TypeScript: siTypescript,
  Vercel: siVercel,
  Vite: siVite,
  Vitest: siVitest,
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
};

const customTechIcons: Record<string, Extract<TechIconDefinition, { kind: 'custom' }>> = {
  'Binary formats': { kind: 'custom', custom: 'binary', color: '#345b7c' },
  'C#': { kind: 'custom', custom: 'csharp', color: '#7a3fb0' },
  'Direct3D 12': { kind: 'custom', custom: 'direct3d', color: '#10893e' },
  Fiber: { kind: 'custom', custom: 'fiber', color: '#00add8' },
  'GameCube ISO': { kind: 'custom', custom: 'gamecube', color: '#5f4bb6' },
  'net/http': { kind: 'custom', custom: 'http', color: '#00add8' },
  'Release packaging': { kind: 'custom', custom: 'package', color: '#b94d00' },
  SDL2: { kind: 'custom', custom: 'sdl', color: '#17395f' },
  vcpkg: { kind: 'custom', custom: 'package', color: '#3f7f5f' },
  'Whisper ASR': { kind: 'custom', custom: 'voice', color: '#ff5a00' },
  'Windows/Linux': { kind: 'custom', custom: 'package', color: '#0078d4' },
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
