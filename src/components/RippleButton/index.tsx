'use client';

import React, { useState, useLayoutEffect, useCallback } from 'react';

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    rippleColor?: string;
    duration?: number;
}

interface Ripple {
    x: number;
    y: number;
    size: number;
    id: number;
}

export function RippleButton({
    children,
    onClick,
    className,
    style,
    rippleColor = 'rgba(255, 255, 255, 0.5)',
    duration = 600,
    ...props
}: RippleButtonProps) {
    const [ripples, setRipples] = useState<Ripple[]>([]);

    const addRipple = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        const newRipple = { x, y, size, id: Date.now() };

        setRipples((prev) => [...prev, newRipple]);

        if (onClick) {
            onClick(event);
        }
    }, [onClick]);

    // Clean up ripples
    useLayoutEffect(() => {
        if (ripples.length > 0) {
            const timeout = setTimeout(() => {
                setRipples((prev) => prev.slice(1));
            }, duration);
            return () => clearTimeout(timeout);
        }
    }, [ripples, duration]);

    return (
        <button
            className={className}
            onClick={addRipple}
            style={{
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                ...style,
            }}
            {...props}
        >
            {children}
            {ripples.map((ripple) => (
                <span
                    key={ripple.id}
                    style={{
                        position: 'absolute',
                        top: ripple.y,
                        left: ripple.x,
                        width: ripple.size,
                        height: ripple.size,
                        backgroundColor: rippleColor,
                        borderRadius: '50%',
                        transform: 'scale(0)',
                        animation: `mangalcore-ripple ${duration}ms linear`,
                        pointerEvents: 'none',
                    }}
                />
            ))}
            <style>
                {`
          @keyframes mangalcore-ripple {
            to {
              transform: scale(4);
              opacity: 0;
            }
          }
        `}
            </style>
        </button>
    );
}
