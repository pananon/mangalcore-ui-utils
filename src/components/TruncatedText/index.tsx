'use client';

import React, { useState } from 'react';

interface TruncatedTextProps {
    text: string;
    charLimit?: number;
    className?: string;
    expandText?: string;
    collapseText?: string;
    renderToggle?: (expanded: boolean, onClick: () => void) => React.ReactNode;
}

export function TruncatedText({
    text,
    charLimit = 100,
    className,
    expandText = 'Read more',
    collapseText = 'Show less',
    renderToggle,
}: TruncatedTextProps) {
    const [expanded, setExpanded] = useState(false);

    if (text.length <= charLimit) {
        return <p className={className}>{text}</p>;
    }

    const displayText = expanded ? text : text.slice(0, charLimit).trim() + '...';
    const toggle = () => setExpanded(!expanded);

    return (
        <div className={className}>
            <p style={{ display: 'inline' }}>{displayText}</p>
            {' '}
            {renderToggle ? (
                renderToggle(expanded, toggle)
            ) : (
                <button
                    onClick={toggle}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#3b82f6',
                        cursor: 'pointer',
                        padding: 0,
                        font: 'inherit',
                        fontWeight: 500,
                    }}
                >
                    {expanded ? collapseText : expandText}
                </button>
            )}
        </div>
    );
}
