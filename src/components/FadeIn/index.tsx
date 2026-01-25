'use client';

import React, { useEffect, useRef, useState } from 'react';

interface FadeInProps {
    children: React.ReactNode;
    duration?: number; // ms
    delay?: number;    // ms
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    distance?: number; // px
    threshold?: number; // 0-1
    className?: string;
}

export function FadeIn({
    children,
    duration = 800,
    delay = 0,
    direction = 'up',
    distance = 30,
    threshold = 0.1,
    className,
}: FadeInProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(element);
                }
            },
            { threshold }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold]);

    const getInitialTransform = () => {
        switch (direction) {
            case 'up': return `translateY(${distance}px)`;
            case 'down': return `translateY(-${distance}px)`;
            case 'left': return `translateX(${distance}px)`;
            case 'right': return `translateX(-${distance}px)`;
            default: return 'none';
        }
    };

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'none' : getInitialTransform(),
                transition: `opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}
