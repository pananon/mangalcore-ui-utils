'use client';

import React from 'react';

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
    from?: string;
    to?: string;
    angle?: number;
    children: React.ReactNode;
    animate?: boolean;
}

export function GradientText({
    from = '#3b82f6', // blue-500
    to = '#a855f7',   // purple-500
    angle = 45,
    children,
    animate = false,
    className,
    style,
    ...props
}: GradientTextProps) {
    return (
        <span
            className={className}
            style={{
                backgroundImage: `linear-gradient(${angle}deg, ${from}, ${to})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                backgroundSize: animate ? '200% auto' : undefined,
                animation: animate ? 'mangalcore-gradient 3s linear infinite' : undefined,
                ...style,
            }}
            {...props}
        >
            {children}
            <style>
                {`
          @keyframes mangalcore-gradient {
            to {
              background-position: 200% center;
            }
          }
        `}
            </style>
        </span>
    );
}
