'use client';

import { useEffect, useState, useMemo } from 'react';

interface TimeAgoProps {
    date: Date | string;
    className?: string;
}

export function TimeAgo({ date, className }: TimeAgoProps) {
    const targetDate = useMemo(() => new Date(date), [date]);
    const [timeAgo, setTimeAgo] = useState('');

    useEffect(() => {
        const calculateTimeAgo = () => {
            const now = new Date();
            const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);

            if (diffInSeconds < 60) {
                setTimeAgo('just now');
                return;
            }

            const diffInMinutes = Math.floor(diffInSeconds / 60);
            if (diffInMinutes < 60) {
                setTimeAgo(`${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`);
                return;
            }

            const diffInHours = Math.floor(diffInMinutes / 60);
            if (diffInHours < 24) {
                setTimeAgo(`${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`);
                return;
            }

            const diffInDays = Math.floor(diffInHours / 24);
            if (diffInDays < 30) {
                setTimeAgo(`${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`);
                return;
            }

            const diffInMonths = Math.floor(diffInDays / 30);
            if (diffInMonths < 12) {
                setTimeAgo(`${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`);
                return;
            }

            const diffInYears = Math.floor(diffInMonths / 12);
            setTimeAgo(`${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`);
        };

        calculateTimeAgo();
        const interval = setInterval(calculateTimeAgo, 60000); // Update every minute

        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <span className={className} title={targetDate.toLocaleString()}>
            {timeAgo}
        </span>
    );
}
