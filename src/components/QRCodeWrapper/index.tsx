'use client';

import { useEffect, useState } from 'react';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';

interface QRCodeWrapperProps {
    value: string;
    size?: number;
    level?: 'L' | 'M' | 'Q' | 'H';
    includeMargin?: boolean;
    renderAs?: 'svg' | 'canvas';
    className?: string;
    imageSettings?: {
        src: string;
        height: number;
        width: number;
        excavate: boolean;
        x?: number;
        y?: number;
    };
}

export function QRCodeWrapper({
    value,
    size = 128,
    level = 'L',
    includeMargin = false,
    renderAs = 'svg',
    className,
    imageSettings,
}: QRCodeWrapperProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div
                style={{ width: size, height: size }}
                className={className}
                aria-label="Loading QR Code"
            />
        );
    }

    const Component = renderAs === 'svg' ? QRCodeSVG : QRCodeCanvas;

    return (
        <div className={className} style={{ display: 'inline-block' }}>
            <Component
                value={value}
                size={size}
                level={level}
                includeMargin={includeMargin}
                imageSettings={imageSettings}
            />
        </div>
    );
}
