import React from 'react';
import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  repeat?: number;
  reverse?: boolean;
}

export function Marquee({ className, children, repeat = 4, reverse = false, ...props }: MarqueeProps) {
  return (
    <div className={cn("group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row", className)} {...props}>
      {[...Array(repeat)].map((_, i) => (
        <div 
          key={i} 
          className={cn(
            "flex shrink-0 justify-around [gap:var(--gap)] animate-marquee",
            reverse && "[animation-direction:reverse]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
