import React from 'react';
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline';
  size?: 'default' | 'lg';
}

export function Badge({ className, variant = 'default', size = 'default', children, ...props }: BadgeProps) {
  return (
    <div 
      className={cn(
        "inline-flex items-center rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "bg-gray-900 text-white hover:bg-gray-900/80 border-transparent": variant === 'default',
          "text-gray-900 border border-gray-200": variant === 'outline',
          "px-2.5 py-0.5 text-xs": size === 'default',
          "px-4 py-1.5 text-sm": size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
