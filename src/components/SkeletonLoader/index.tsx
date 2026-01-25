
interface SkeletonLoaderProps {
    width?: number | string;
    height?: number | string;
    borderRadius?: number | string;
    className?: string;
}

export function SkeletonLoader({
    width = '100%',
    height = 20,
    borderRadius = 4,
    className,
}: SkeletonLoaderProps) {
    return (
        <div
            className={className}
            style={{
                width,
                height,
                borderRadius,
                backgroundColor: '#e5e7eb',
                animation: 'mangalcore-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }}
        >
            <style>
                {`
          @keyframes mangalcore-pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
        `}
            </style>
        </div>
    );
}
