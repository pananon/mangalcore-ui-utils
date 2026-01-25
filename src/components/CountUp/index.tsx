'use client';

import { useEffect, useState, useRef } from 'react';

interface CountUpProps {
    end: number;
    start?: number;
    duration?: number; // ms
    decimals?: number;
    prefix?: string;
    suffix?: string;
    className?: string;
}

export function CountUp({
    end,
    start = 0,
    duration = 2000,
    decimals = 0,
    prefix = '',
    suffix = '',
    className,
}: CountUpProps) {
    const [count, setCount] = useState(start);
    const ref = useRef<HTMLSpanElement>(null);
    const startTime = useRef<number | null>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    startAnimation();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [end, duration]); // Restart if end/duration changes? Maybe not for simple version.

    const startAnimation = () => {
        const step = (timestamp: number) => {
            if (!startTime.current) startTime.current = timestamp;
            const progress = timestamp - startTime.current;
            const percentage = Math.min(progress / duration, 1);

            // EaseOutQuart
            const ease = 1 - Math.pow(1 - percentage, 4);

            const currentCount = start + (end - start) * ease;
            setCount(currentCount);

            if (percentage < 1) {
                requestAnimationFrame(step);
            } else {
                setCount(end); // Ensure exact finish
            }
        };
        requestAnimationFrame(step);
    };

    return (
        <span ref={ref} className={className}>
            {prefix}
            {count.toFixed(decimals)}
            {suffix}
        </span>
    );
}
