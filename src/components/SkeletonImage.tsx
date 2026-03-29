'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

export default function SkeletonImage({
  className = '',
  ...props
}: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 skeleton-shimmer rounded-inherit" />
      )}
      <Image
        {...props}
        className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}
