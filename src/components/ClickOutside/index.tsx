'use client';

import React, { useEffect, useRef } from 'react';

interface ClickOutsideProps {
    children: React.ReactNode;
    onClickOutside: () => void;
    className?: string;
    as?: React.ElementType; // allow render as specific element like 'span' or 'div'
}

export function ClickOutside({
    children,
    onClickOutside,
    className,
    as: Component = 'div',
}: ClickOutsideProps) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClickOutside();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [onClickOutside]);

    return (
        <Component ref={ref} className={className}>
            {children}
        </Component>
    );
}
