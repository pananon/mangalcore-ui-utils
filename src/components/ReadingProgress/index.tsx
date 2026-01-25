'use client';

import { useEffect, useState } from 'react';

interface ReadingProgressProps {
    color?: string;
    height?: number;
    className?: string;
}

export function ReadingProgress({
    color = '#3b82f6',
    height = 4,
    className,
}: ReadingProgressProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (scrollTop / docHeight) * 100;
            setProgress(scrolled > 100 ? 100 : scrolled);
        };

        window.addEventListener('scroll', updateProgress);
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
        <div
            className={className}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: `${progress}%`,
                height: height,
                backgroundColor: color,
                zIndex: 9999,
                transition: 'width 0.1s ease-out',
            }}
        />
    );
}
