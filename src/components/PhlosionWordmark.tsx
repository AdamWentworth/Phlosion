import Image from 'next/image';

type PhlosionWordmarkProps = {
  className?: string;
  sizes: string;
  loading?: 'eager' | 'lazy';
  preload?: boolean;
};

export function PhlosionWordmark({ className, sizes, loading, preload }: PhlosionWordmarkProps) {
  const classes = ['theme-wordmark', className].filter(Boolean).join(' ');

  return (
    <span className={classes} aria-label="Phlosion">
      <Image
        className="theme-wordmark-image theme-wordmark-image-blue"
        src="/brand/phlosion-wordmark-blue.png"
        alt=""
        width={1877}
        height={342}
        sizes={sizes}
        loading={loading}
        preload={preload}
      />
      <Image
        className="theme-wordmark-image theme-wordmark-image-cream"
        src="/brand/phlosion-wordmark-cream.png"
        alt=""
        width={1877}
        height={342}
        sizes={sizes}
        loading={loading}
      />
    </span>
  );
}
