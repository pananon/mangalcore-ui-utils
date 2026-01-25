
interface ProgressRingProps {
    percent: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
    className?: string;
    trackColor?: string;
}

export function ProgressRing({
    percent,
    size = 40,
    strokeWidth = 4,
    color = '#3b82f6',
    trackColor = '#e5e7eb',
    className,
}: ProgressRingProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percent / 100) * circumference;

    return (
        <div
            className={className}
            style={{
                width: size,
                height: size,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
            }}
        >
            <svg width={size} height={size}>
                <circle
                    stroke={trackColor}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    style={{ transition: 'stroke-dashoffset 0.35s' }}
                />
            </svg>
            <span
                style={{
                    position: 'absolute',
                    fontSize: size * 0.25,
                    fontWeight: 'bold',
                    color: 'inherit',
                }}
            >
                {Math.round(percent)}%
            </span>
        </div>
    );
}
