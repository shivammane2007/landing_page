"use client";

import * as React from "react";
import clsx from "clsx";

export type AnimatedGenerateButtonProps = {
  className?: string;
  labelIdle?: string;
  labelActive?: string;
  generating?: boolean;
  highlightHueDeg?: number;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  id?: string;
  ariaLabel?: string;
  icon?: React.ReactNode;
};

export default function AnimatedGenerateButton({
  className,
  labelIdle = "Generate",
  labelActive = "Generating",
  generating = false,
  highlightHueDeg = 210,
  onClick,
  type = "button",
  disabled = false,
  id,
  ariaLabel,
  icon,
}: AnimatedGenerateButtonProps) {
  return (
    <div className={clsx("relative inline-block", className)} id={id}>
      <div
        role="button"
        aria-label={ariaLabel || (generating ? labelActive : labelIdle)}
        aria-pressed={generating}
        onClick={onClick}
        className={clsx(
          "ui-anim-btn",
          "relative flex items-center justify-center cursor-pointer select-none w-full",
          "rounded-full px-5 py-2.5",
          "bg-gray-900 text-white font-medium text-[13px] md:text-sm",
          "border border-gray-700",
          "shadow-[inset_0px_1px_1px_rgba(255,255,255,0.2),inset_0px_2px_2px_rgba(255,255,255,0.15),0_-1px_1px_rgba(0,0,0,0.02)]",
          "transition-[box-shadow,border,background-color] duration-400"
        )}
        style={
          {
            ["--highlight-hue" as any]: `${highlightHueDeg}deg`,
          } as React.CSSProperties
        }
      >
        {icon ? (
          <div className={clsx(
            "ui-anim-btn-svg mr-2 h-4 w-4 flex-grow-0 flex items-center justify-center",
            "transition-[fill,color,filter,opacity] duration-400"
          )}>
            {icon}
          </div>
        ) : (
          <svg
            className={clsx(
              "ui-anim-btn-svg mr-2 h-4 w-4 flex-grow-0",
              "transition-[fill,color,filter,opacity] duration-400"
            )}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
            ></path>
          </svg>
        )}
        <div className="ui-anim-txt-wrapper relative flex min-w-[6.4em] items-center justify-center">
          <div
            className={clsx(
              "ui-anim-txt-1 relative whitespace-nowrap",
              generating ? "opacity-0" : "animate-[ui-appear_1s_ease-in-out_forwards]"
            )}
          >
            {Array.from(labelIdle).map((ch, i) => (
              <span key={i} className="ui-anim-letter inline-block">
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </div>
          <div
            className={clsx(
              "ui-anim-txt-2 absolute left-1/2 -translate-x-1/2 whitespace-nowrap",
              generating ? "opacity-100" : "opacity-0"
            )}
          >
            {Array.from(labelActive).map((ch, i) => (
              <span key={i} className="ui-anim-letter inline-block">
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .ui-anim-btn {
          --padding: 4px;
          --radius: 24px;
          --transition: 0.4s;
          --highlight: hsl(var(--highlight-hue), 100%, 70%);
          --highlight-50: hsla(var(--highlight-hue), 100%, 70%, 0.5);
          --highlight-30: hsla(var(--highlight-hue), 100%, 70%, 0.3);
          --highlight-20: hsla(var(--highlight-hue), 100%, 70%, 0.2);
          --highlight-80: hsla(var(--highlight-hue), 100%, 70%, 0.8);
          --ui-anim-svg-fill: #e8e8e8;
        }

        .ui-anim-btn::before {
          content: "";
          position: absolute;
          top: calc(0px - var(--padding));
          left: calc(0px - var(--padding));
          width: calc(100% + var(--padding) * 2);
          height: calc(100% + var(--padding) * 2);
          border-radius: calc(var(--radius) + var(--padding));
          pointer-events: none;
          background-image: linear-gradient(0deg, #0004, #000a);
          z-index: -1;
          transition: box-shadow var(--transition), filter var(--transition);
        }

        .ui-anim-btn::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          background-image: linear-gradient(0deg, #fff, var(--highlight), var(--highlight-50), 8%, transparent);
          background-position: 0 0;
          opacity: 0;
          transition: opacity var(--transition), filter var(--transition);
        }

        /* Letters */
        .ui-anim-letter {
          color: #ffffff88;
          transition: color var(--transition), opacity var(--transition);
        }
        
        .ui-anim-btn:hover .ui-anim-letter {
          color: #ffffff;
        }

        /* SVG flicker */
        .ui-anim-btn-svg {
          filter: drop-shadow(0 0 2px #fff9);
          transition: filter var(--transition), opacity var(--transition);
        }
        
        .ui-anim-btn:hover .ui-anim-btn-svg {
          filter: drop-shadow(0 0 4px #fff);
        }

        @keyframes ui-flicker {
          50% {
            opacity: 0.3;
          }
        }

        /* Text layers */
        @keyframes ui-appear {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        /* Focus swaps idle/active text with delays mimicking original */
        .ui-anim-btn:focus .ui-anim-txt-1 {
          animation: ui-opacity-swap 0.3s ease-in-out forwards;
          animation-delay: 1s;
        }
        .ui-anim-btn:focus .ui-anim-txt-2 {
          animation: ui-opacity-swap 0.3s ease-in-out reverse forwards;
          animation-delay: 1s;
        }

        @keyframes ui-opacity-swap {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        .ui-anim-btn:focus .ui-anim-letter {
          animation: ui-focused-letter 1s ease-in-out forwards;
        }

        @keyframes ui-focused-letter {
          0%,
          100% {
            filter: blur(0px);
            transform: scale(1);
          }
          50% {
            transform: scale(1.5);
            filter: blur(2px) brightness(150%);
          }
        }

        .ui-anim-btn:focus .ui-anim-btn-svg {
          animation-duration: 1.2s;
          animation-delay: 0.2s;
        }

        .ui-anim-btn:focus::after {
          opacity: 0.6;
          filter: brightness(100%);
        }

        /* Hover */
        .ui-anim-btn:hover {
          border-color: hsla(var(--highlight-hue), 100%, 80%, 0.4);
        }
        
        .ui-anim-btn:hover::after {
          opacity: 1;
        }
        .ui-anim-btn:hover .ui-anim-btn-svg {
          fill: #fff;
          color: #fff;
          filter: drop-shadow(0 0 3px var(--highlight));
        }

        /* Active */
        .ui-anim-btn:active {
          border-color: hsla(var(--highlight-hue), 100%, 80%, 0.7);
          background-color: hsla(var(--highlight-hue), 50%, 20%, 0.5);
        }
        
        .ui-anim-btn:active::after {
          opacity: 1;
          -webkit-mask-image: linear-gradient(0deg, #fff, transparent);
          mask-image: linear-gradient(0deg, #fff, transparent);
          filter: brightness(200%);
        }
        .ui-anim-btn:active .ui-anim-letter {
          text-shadow: 0 0 1px hsla(var(--highlight-hue), 100%, 90%, 0.9);
          animation: none;
        }

        /* Letter stagger delays 1:1 */
        .ui-anim-txt-1 .ui-anim-letter:nth-child(1),
        .ui-anim-txt-2 .ui-anim-letter:nth-child(1) {
          animation-delay: 0s;
        }
        .ui-anim-txt-1 .ui-anim-letter:nth-child(2),
        .ui-anim-txt-2 .ui-anim-letter:nth-child(2) {
          animation-delay: 0.05s;
        }
        .ui-anim-txt-1 .ui-anim-letter:nth-child(3),
        .ui-anim-txt-2 .ui-anim-letter:nth-child(3) {
          animation-delay: 0.1s;
        }
        .ui-anim-txt-1 .ui-anim-letter:nth-child(4),
        .ui-anim-txt-2 .ui-anim-letter:nth-child(4) {
          animation-delay: 0.15s;
        }
        .ui-anim-txt-1 .ui-anim-letter:nth-child(5),
        .ui-anim-txt-2 .ui-anim-letter:nth-child(5) {
          animation-delay: 0.2s;
        }
        .ui-anim-txt-1 .ui-anim-letter:nth-child(6),
        .ui-anim-txt-2 .ui-anim-letter:nth-child(6) {
          animation-delay: 0.25s;
        }
        .ui-anim-txt-1 .ui-anim-letter:nth-child(7),
        .ui-anim-txt-2 .ui-anim-letter:nth-child(7) {
          animation-delay: 0.3s;
        }
        .ui-anim-txt-1 .ui-anim-letter:nth-child(8),
        .ui-anim-txt-2 .ui-anim-letter:nth-child(8) {
          animation-delay: 0.35s;
        }
        .ui-anim-txt-1 .ui-anim-letter:nth-child(9),
        .ui-anim-txt-2 .ui-anim-letter:nth-child(9) {
          animation-delay: 0.4s;
        }
        .ui-anim-txt-1 .ui-anim-letter:nth-child(10),
        .ui-anim-txt-2 .ui-anim-letter:nth-child(10) {
          animation-delay: 0.45s;
        }
        .ui-anim-txt-1 .ui-anim-letter:nth-child(11),
        .ui-anim-txt-2 .ui-anim-letter:nth-child(11) {
          animation-delay: 0.5s;
        }
        .ui-anim-txt-1 .ui-anim-letter:nth-child(12),
        .ui-anim-txt-2 .ui-anim-letter:nth-child(12) {
          animation-delay: 0.55s;
        }
        .ui-anim-txt-1 .ui-anim-letter:nth-child(13),
        .ui-anim-txt-2 .ui-anim-letter:nth-child(13) {
          animation-delay: 0.6s;
        }
        .ui-anim-txt-1 .ui-anim-letter:nth-child(14),
        .ui-anim-txt-2 .ui-anim-letter:nth-child(14) {
          animation-delay: 0.65s;
        }
        .ui-anim-txt-1 .ui-anim-letter:nth-child(15),
        .ui-anim-txt-2 .ui-anim-letter:nth-child(15) {
          animation-delay: 0.7s;
        }
        .ui-anim-txt-1 .ui-anim-letter:nth-child(16),
        .ui-anim-txt-2 .ui-anim-letter:nth-child(16) {
          animation-delay: 0.75s;
        }

        /* Disabled */
        .ui-anim-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
