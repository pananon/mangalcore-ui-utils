'use client';

import React, { useRef, useState } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    spotlightColor?: string;
    cardBackground?: string;
    borderColor?: string;
}

export function SpotlightCard({
    children,
    spotlightColor = 'rgba(255, 255, 255, 0.1)',
    cardBackground = '#171717', // neutral-900
    borderColor = 'rgba(255, 255, 255, 0.1)',
    className,
    style,
    ...props
}: SpotlightCardProps) {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: -500, y: -500 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}
            style={{
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: cardBackground,
                border: `1px solid ${borderColor}`,
                borderRadius: '12px',
                ...style,
            }}
            {...props}
        >
            <div
                style={{
                    pointerEvents: 'none',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    opacity: opacity,
                    transition: 'opacity 0.3s ease',
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
                }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
        </div>
    );
}
