"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

function MoviePassButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      className={cn(
        className,
        "px-6 py-3 bg-white text-gray-700",
        "border border-gray-200 shadow-sm font-medium text-sm",
        "relative",
        "active:scale-95 transition-all duration-75",
      )}
    >
      {/* Outer corner cutouts */}
      <div className="size-4 rounded-full absolute -top-2 bg-[#f7f7f5] -left-2 shadow-[inset_-1px_-1px_2px_rgba(0,0,0,0.05)] border-r border-b border-gray-200" />
      <div className="size-4 rounded-full absolute -top-2 bg-[#f7f7f5] -right-2 shadow-[inset_1px_-1px_2px_rgba(0,0,0,0.05)] border-l border-b border-gray-200" />
      <div className="size-4 rounded-full absolute -bottom-2 bg-[#f7f7f5] -right-2 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.05)] border-l border-t border-gray-200" />
      <div className="size-4 rounded-full absolute -bottom-2 bg-[#f7f7f5] -left-2 shadow-[inset_-1px_1px_2px_rgba(0,0,0,0.05)] border-r border-t border-gray-200" />

      {children}
    </button>
  );
}
export default MoviePassButton;
