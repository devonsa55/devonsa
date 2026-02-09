import { useState, useEffect } from 'react';

export const useHonoluluTime = () => {
    const [localTime, setLocalTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const options: Intl.DateTimeFormatOptions = {
                timeZone: 'Pacific/Honolulu',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            };
            setLocalTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
        };

        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    return localTime;
};
