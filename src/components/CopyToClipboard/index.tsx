'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyToClipboardProps {
    text: string;
    className?: string;
    onCopy?: () => void;
}

export function CopyToClipboard({ text, className, onCopy }: CopyToClipboardProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            if (onCopy) onCopy();
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy!', err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className={`inline-flex items-center justify-center rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${className || ''}`}
            aria-label="Copy to clipboard"
            style={{ border: '1px solid #e5e7eb', cursor: 'pointer', background: 'transparent' }}
        >
            {copied ? (
                <Check size={16} className="text-green-500" />
            ) : (
                <Copy size={16} className="text-gray-500" />
            )}
            {copied && <span style={{ marginLeft: 8, fontSize: 12, color: 'green' }}>Copied!</span>}
        </button>
    );
}
