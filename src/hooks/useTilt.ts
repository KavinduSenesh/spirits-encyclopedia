'use client';

import { useRef, useState, useCallback, useEffect } from 'react';

interface TiltStyle {
  transform: string;
  transition: string;
}

export function useTilt(maxTilt: number = 7) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<TiltStyle>({
    transform: 'perspective(800px) rotateX(0deg) rotateY(0deg)',
    transition: 'transform 0.4s ease',
  });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const isTouch = useRef(false);
  const rafId = useRef<number>(0);

  useEffect(() => {
    isTouch.current = 'ontouchstart' in window || window.matchMedia('(hover: none)').matches;
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouch.current || !ref.current) return;

      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const rect = ref.current!.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const rotateY = (x - 0.5) * maxTilt * 2;
        const rotateX = (0.5 - y) * maxTilt * 2;

        setStyle({
          transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'none',
        });
        setGlare({ x: x * 100, y: y * 100, opacity: 0.08 });
      });
    },
    [maxTilt]
  );

  const onMouseLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(800px) rotateX(0deg) rotateY(0deg)',
      transition: 'transform 0.4s ease',
    });
    setGlare({ x: 50, y: 50, opacity: 0 });
  }, []);

  return { ref, style, glare, onMouseMove, onMouseLeave };
}
