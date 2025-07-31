'use client'

import Image from "next/image"
import { useState } from "react";

export default function BlurImage({ image, alt, rounded = 'lg', aspectW = '1', aspectH = '1', aspectWLg = '7', aspectHLg = '8' }) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="group">
      <div className={`aspect-w-${aspectW} aspect-h-${aspectH} w-full rounded-${rounded} lg:aspect-w-${aspectWLg} lg:aspect-h-${aspectHLg}`}>
        <Image
          alt={ alt || '' }
          src={image}
          fill
          className={`
              object-cover
              duration-700 ease-in-out group-hover:opacity-75
              ${
                isLoading
                  ? "scale-110 blur-2xl grayscale"
                  : "scale-100 blur-0 grayscale-0"
              })`}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
    </div>
  );
}