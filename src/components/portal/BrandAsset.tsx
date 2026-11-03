import { useState } from "react";

/** Original repository ZIP contains no /public/brand assets.
 * Display a graceful fallback until the actual institutional image is provided. */
type Props = { src: string; alt: string; className?: string; fallback: string; fallbackClassName?: string };
export default function BrandAsset({ src, alt, className, fallback, fallbackClassName }: Props) {
  const [missing, setMissing] = useState(false);
  if (missing) return <span role="img" aria-label={alt} className={fallbackClassName}>{fallback}</span>;
  return <img src={src} alt={alt} className={className} onError={() => setMissing(true)} />;
}
