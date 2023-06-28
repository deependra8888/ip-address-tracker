/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

export function useDimensions() {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [bodyHeight, setBodyHeight] = useState(
        Math.max(
            document?.body?.scrollHeight,
            document?.body?.offsetHeight,
            document?.documentElement?.clientHeight,
            document?.documentElement?.scrollHeight,
            document?.documentElement?.offsetHeight
        )
    );

    useEffect(() => {
        const handleWindowResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setBodyHeight(
                Math.max(
                    document?.body?.scrollHeight,
                    document?.body?.offsetHeight,
                    document?.documentElement?.clientHeight,
                    document?.documentElement?.scrollHeight,
                    document?.documentElement?.offsetHeight
                )
            );
        };

        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return { width, height, bodyHeight };
}
