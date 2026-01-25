'use client';

import { useMemo } from 'react';

interface MaskedTextProps {
    value: string;
    visibleChars?: number;
    maskChar?: string;
    className?: string;
}

export function MaskedText({
    value,
    visibleChars = 4,
    maskChar = '*',
    className,
}: MaskedTextProps) {
    const maskedValue = useMemo(() => {
        if (!value) return '';
        const length = value.length;
        if (length <= visibleChars) return value;

        const visiblePart = value.slice(-visibleChars);
        const hiddenPart = maskChar.repeat(length - visibleChars);

        return hiddenPart + visiblePart;
    }, [value, visibleChars, maskChar]);

    return (
        <span className={className} style={{ fontFamily: 'monospace' }}>
            {maskedValue}
        </span>
    );
}
