export type ImageSize = {
  width: number;
  height: number;
};

const imageSizes = {
  '/phlosion-mark.png': { width: 911, height: 911 },
  '/phlosion-wordmark.png': { width: 1877, height: 342 },
  '/products/cipher-snagem-editor/cipher-snagem-lockup-transparent.png': { width: 1448, height: 660 },
  '/products/cipher-snagem-editor/cipher-snagem-mark-transparent.png': { width: 1024, height: 1024 },
  '/products/cipher-snagem-editor/cipher-snagem-wordmark-transparent.png': { width: 1212, height: 574 },
  '/products/jarvin/jarvin-icon-clean.png': { width: 760, height: 759 },
  '/products/jarvin/jarvin-lockup-dark.png': { width: 929, height: 908 },
  '/products/jarvin/jarvin-wordmark-white.png': { width: 1058, height: 166 },
  '/products/pokemon-autochess/autochess-lockup-transparent.png': { width: 1536, height: 505 },
  '/products/pokemon-autochess/autochess-mark-alt-transparent.png': { width: 1024, height: 1024 },
  '/products/pokemon-autochess/autochess-mark-transparent.png': { width: 1024, height: 1024 },
  '/products/pokemon-autochess/autochess-wordmark-transparent.png': { width: 2172, height: 724 },
  '/products/pokemon-go-nexus/nexus-lockup-with-mark-transparent.png': { width: 1655, height: 698 },
  '/products/pokemon-go-nexus/nexus-logo.png': { width: 1024, height: 1024 },
  '/products/pokemon-go-nexus/nexus-wordmark-transparent.png': { width: 1561, height: 706 },
  '/tech/llamacpp-logo.svg': { width: 24, height: 24 },
  '/tech/sol2-logo.png': { width: 200, height: 200 },
  '/tech/vite-logo.svg': { width: 410, height: 404 },
  '/tech/vcpkg-logo.svg': { width: 16, height: 16 },
  '/tech/vitest-logo.svg': { width: 256, height: 234 },
} satisfies Record<string, ImageSize>;

export function getImageSize(src: string, fallback: ImageSize): ImageSize {
  return imageSizes[src as keyof typeof imageSizes] ?? fallback;
}
