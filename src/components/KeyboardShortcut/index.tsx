import React from 'react';

interface KeyboardShortcutProps {
    keys: string[];
    className?: string;
}

export function KeyboardShortcut({ keys, className }: KeyboardShortcutProps) {
    return (
        <span className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            {keys.map((k, i) => (
                <React.Fragment key={i}>
                    <kbd
                        style={{
                            padding: '2px 6px',
                            fontSize: '12px',
                            fontFamily: 'sans-serif',
                            fontWeight: 500,
                            lineHeight: '1',
                            color: '#374151',
                            backgroundColor: '#f3f4f6',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            boxShadow: '0 1px 0 0 #d1d5db',
                            minWidth: '20px',
                            textAlign: 'center',
                        }}
                    >
                        {k}
                    </kbd>
                    {i < keys.length - 1 && <span style={{ color: '#9ca3af', fontSize: 12 }}>+</span>}
                </React.Fragment>
            ))}
        </span>
    );
}
