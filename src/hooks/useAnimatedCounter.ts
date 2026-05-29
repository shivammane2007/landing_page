"use client";

import { useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function useAnimatedCounter(
  targetValue: number,
  duration: number = 2000,
  format: (val: number) => string = (val) => val.toString()
) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // easeOutQuart
      const ease = 1 - Math.pow(1 - percentage, 4);
      const currentVal = Math.floor(ease * targetValue);
      
      setCount(currentVal);

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(targetValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, targetValue, duration]);

  return { ref, count, formatted: format(count) };
}
