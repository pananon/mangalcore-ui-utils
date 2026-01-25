'use client';

import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface JsonViewerProps {
    data: unknown;
    initialExpanded?: boolean;
    className?: string;
}

export function JsonViewer({ data, initialExpanded = false, className }: JsonViewerProps) {
    return (
        <div className={className} style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
            <JsonNode data={data} name="root" isLast={true} initialExpanded={initialExpanded} />
        </div>
    );
}

interface JsonNodeProps {
    data: unknown;
    name: string;
    isLast: boolean;
    initialExpanded: boolean;
    depth?: number;
}

function JsonNode({ data, name, isLast, initialExpanded, depth = 0 }: JsonNodeProps) {
    const [expanded, setExpanded] = useState(initialExpanded || depth === 0);

    const isObject = data !== null && typeof data === 'object';
    const isArray = Array.isArray(data);
    const isEmpty = isObject && Object.keys(data as object).length === 0;

    if (!isObject) {
        return (
            <div style={{ paddingLeft: depth * 20, display: 'flex' }}>
                <span style={{ color: '#8b5cf6', marginRight: 4 }}>{name}:</span>
                <span style={{ color: typeof data === 'string' ? '#22c55e' : '#f59e0b' }}>
                    {JSON.stringify(data)}
                </span>
                {!isLast && <span>,</span>}
            </div>
        );
    }

    const keys = Object.keys(data as object);

    return (
        <div style={{ paddingLeft: depth * 20 }}>
            <div
                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                onClick={() => !isEmpty && setExpanded(!expanded)}
            >
                {!isEmpty ? (
                    expanded ? (
                        <ChevronDown size={14} />
                    ) : (
                        <ChevronRight size={14} />
                    )
                ) : (
                    <span style={{ width: 14 }} />
                )}
                <span style={{ color: '#3b82f6', marginRight: 4, fontWeight: 'bold' }}>{name}</span>
                <span>{isArray ? '[' : '{'}</span>
                {!expanded && !isEmpty && <span>...</span>}
                {!expanded && <span>{isArray ? ']' : '}'}</span>}
                {!isLast && !expanded && <span>,</span>}
            </div>

            {expanded && !isEmpty && (
                <>
                    {keys.map((key, index) => (
                        <JsonNode
                            key={key}
                            name={isArray ? index.toString() : key}
                            data={(data as Record<string, unknown>)[key]}
                            isLast={index === keys.length - 1}
                            initialExpanded={initialExpanded}
                            depth={1}
                        />
                    ))}
                    <div style={{ paddingLeft: 0 }}>
                        <span>{isArray ? ']' : '}'}</span>
                        {!isLast && <span>,</span>}
                    </div>
                </>
            )}
        </div>
    );
}
