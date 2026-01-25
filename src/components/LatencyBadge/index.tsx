
interface LatencyBadgeProps {
    ms: number;
    className?: string;
    thresholds?: {
        good: number;
        warning: number;
    };
}

export function LatencyBadge({
    ms,
    className,
    thresholds = { good: 100, warning: 300 },
}: LatencyBadgeProps) {
    let color = '#22c55e'; // green
    let bg = '#dcfce7';

    if (ms > thresholds.warning) {
        color = '#ef4444'; // red
        bg = '#fee2e2';
    } else if (ms > thresholds.good) {
        color = '#eab308'; // yellow
        bg = '#fef9c3';
    }

    return (
        <span
            className={className}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '2px 8px',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 500,
                backgroundColor: bg,
                color: color,
                lineHeight: 1,
            }}
        >
            <span
                style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: 'currentColor',
                    marginRight: 6,
                }}
            />
            {ms}ms
        </span>
    );
}
