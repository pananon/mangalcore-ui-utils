'use client';

import { useMemo } from 'react';

interface AvatarFromNameProps {
    name: string;
    size?: number;
    className?: string;
    borderRadius?: string;
}

const COLORS = [
    '#ef4444', // red
    '#f97316', // orange
    '#f59e0b', // amber
    '#84cc16', // lime
    '#10b981', // emerald
    '#06b6d4', // cyan
    '#3b82f6', // blue
    '#6366f1', // indigo
    '#8b5cf6', // violet
    '#d946ef', // fuchsia
    '#f43f5e', // rose
];

function getInitials(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
}

function getColor(name: string): string {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return COLORS[Math.abs(hash) % COLORS.length];
}

export function AvatarFromName({
    name,
    size = 40,
    className,
    borderRadius = '50%',
}: AvatarFromNameProps) {
    const initials = useMemo(() => getInitials(name), [name]);
    const backgroundColor = useMemo(() => getColor(name), [name]);

    return (
        <div
            className={className}
            style={{
                width: size,
                height: size,
                borderRadius,
                backgroundColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: size * 0.4,
                userSelect: 'none',
            }}
            aria-label={`Avatar for ${name}`}
        >
            {initials}
        </div>
    );
}
