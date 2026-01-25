'use client';

import React from 'react';

interface MarqueeProps {
    children: React.ReactNode;
    duration?: number; // seconds
    gap?: number;      // px
    reverse?: boolean;
    pauseOnHover?: boolean;
    className?: string;
}

export function Marquee({
    children,
    duration = 20,
    gap = 20,
    reverse = false,
    pauseOnHover = false,
    className,
}: MarqueeProps) {
    return (
        <div
            className={className}
            style={{
                display: 'flex',
                overflow: 'hidden',
                userSelect: 'none',
                gap: `${gap}px`,
                maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            }}
        >
            {/* Multiply content to ensure smooth seamless loop */}
            <div
                style={{
                    display: 'flex',
                    flexShrink: 0,
                    justifyContent: 'space-around',
                    gap: `${gap}px`,
                    minWidth: '100%',
                    animation: `mangalcore-scroll ${duration}s linear infinite`,
                    animationDirection: reverse ? 'reverse' : 'normal',
                    animationPlayState: 'running',
                }}
                className={pauseOnHover ? 'mangalcore-marquee-content' : ''}
            >
                {children}
            </div>
            <div
                style={{
                    display: 'flex',
                    flexShrink: 0,
                    justifyContent: 'space-around',
                    gap: `${gap}px`,
                    minWidth: '100%',
                    animation: `mangalcore-scroll ${duration}s linear infinite`,
                    animationDirection: reverse ? 'reverse' : 'normal',
                    animationPlayState: 'running',
                }}
                className={pauseOnHover ? 'mangalcore-marquee-content' : ''}
            >
                {children}
            </div>

            <style>
                {`
          @keyframes mangalcore-scroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(calc(-100% - ${gap}px));
            }
          }
          .mangalcore-marquee-content:hover {
            animation-play-state: paused !important;
          }
        `}
            </style>
        </div>
    );
}
