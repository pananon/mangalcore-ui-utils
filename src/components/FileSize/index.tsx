'use client';

import { useMemo } from 'react';
import { formatBytes } from '../../utils/formatBytes';

interface FileSizeProps {
    bytes: number;
    decimals?: number;
    className?: string;
}

export function FileSize({ bytes, decimals = 2, className }: FileSizeProps) {
    const formattedSize = useMemo(() => formatBytes(bytes, decimals), [bytes, decimals]);

    return <span className={className}>{formattedSize}</span>;
}
