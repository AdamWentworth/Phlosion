export type ImageSize = {
  width: number;
  height: number;
};

const imageSizes = {
  '/brand/phlosion-mark.png': { width: 1254, height: 1254 },
  '/brand/phlosion-wordmark-blue.png': { width: 1877, height: 342 },
  '/products/binderledger/binderledger-icon.png': { width: 1254, height: 1254 },
  '/products/binderledger/binderledger-mark.png': { width: 112, height: 168 },
  '/products/binderledger/binderledger-wordmark.png': { width: 720, height: 124 },
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
  '/products/trackextract/trackextract-logo-mini.png': { width: 936, height: 936 },
  '/products/trackextract/trackextract-logo-row-white.png': { width: 1368, height: 370 },
  '/products/trackextract/trackextract-logo-stacked-white.png': { width: 720, height: 505 },
  '/products/trackextract/trackextract-logo-text-white.png': { width: 720, height: 94 },
  '/products/winrift/screenshots/champion-guide.png': { width: 1440, height: 1200 },
  '/products/winrift/screenshots/homepage.png': { width: 1440, height: 1000 },
  '/products/winrift/screenshots/live-match.png': { width: 1440, height: 1050 },
  '/products/winrift/winrift-icon-wide.png': { width: 710, height: 239 },
  '/products/winrift/winrift-icon.png': { width: 458, height: 464 },
  '/products/winrift/winrift-logo-tall-compact.png': { width: 476, height: 335 },
  '/products/winrift/winrift-logo-tall.png': { width: 534, height: 552 },
  '/products/winrift/winrift-wordmark.png': { width: 528, height: 90 },
  '/tech/llamacpp-logo.svg': { width: 24, height: 24 },
  '/tech/opencv-logo.svg': { width: 164, height: 153 },
  '/tech/sol2-logo.png': { width: 200, height: 200 },
  '/tech/tesseract-logo.png': { width: 512, height: 512 },
  '/tech/vite-logo.svg': { width: 410, height: 404 },
  '/tech/vcpkg-logo.svg': { width: 16, height: 16 },
  '/tech/vitest-logo.svg': { width: 256, height: 234 },
} satisfies Record<string, ImageSize>;

export function getImageSize(src: string, fallback: ImageSize): ImageSize {
  return imageSizes[src as keyof typeof imageSizes] ?? fallback;
}
