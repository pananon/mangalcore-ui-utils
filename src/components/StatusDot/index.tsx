
type StatusType = 'online' | 'offline' | 'busy' | 'away' | 'custom';

interface StatusDotProps {
    status?: StatusType;
    color?: string; // for custom status
    pulse?: boolean;
    size?: number;
    className?: string;
    title?: string;
}

export function StatusDot({
    status = 'online',
    color,
    pulse = false,
    size = 10,
    className,
    title,
}: StatusDotProps) {
    let finalColor = '#22c55e'; // online (green)

    switch (status) {
        case 'offline':
            finalColor = '#9ca3af'; // gray
            break;
        case 'busy':
            finalColor = '#ef4444'; // red
            break;
        case 'away':
            finalColor = '#eab308'; // yellow
            break;
        case 'custom':
            finalColor = color || '#3b82f6';
            break;
    }

    return (
        <span
            className={className}
            title={title || status}
            style={{
                display: 'inline-block',
                position: 'relative',
                width: size,
                height: size,
            }}
        >
            {pulse && (
                <span
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        backgroundColor: finalColor,
                        opacity: 0.75,
                        animation: 'mangalcore-ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
                    }}
                />
            )}
            <span
                style={{
                    position: 'relative',
                    display: 'inline-block',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    backgroundColor: finalColor,
                }}
            />
            <style>
                {`
          @keyframes mangalcore-ping {
            75%, 100% {
              transform: scale(2);
              opacity: 0;
            }
          }
        `}
            </style>
        </span>
    );
}
