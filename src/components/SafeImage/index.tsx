'use client';

import { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallback: string;
}

export function SafeImage({ src, fallback, alt, ...props }: SafeImageProps) {
    const [error, setError] = useState(false);

    return (
        <img
            src={error ? fallback : src}
            alt={alt}
            onError={() => setError(true)}
            {...props}
        />
    );
}
