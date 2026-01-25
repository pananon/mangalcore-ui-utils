'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: React.ReactNode;
    containerId?: string; // Optional: render into a specific container instead of body
}

export function Portal({ children, containerId }: PortalProps) {
    const [mounted, setMounted] = useState(false);
    const [container, setContainer] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setMounted(true);
        let target = document.body;
        if (containerId) {
            const el = document.getElementById(containerId);
            if (el) target = el;
        }
        setContainer(target);

        return () => setMounted(false);
    }, [containerId]);

    if (!mounted || !container) return null;

    return createPortal(children, container);
}
