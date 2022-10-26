import { useEffect, useRef } from "react";

export const useMountedEffect = (
    effect,
    deps
) => {
    const mounted = useRef(false);
    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

    useEffect(() => {
        if (mounted.current) effect();
    }, [...deps]); // eslint-disable-line react-hooks/exhaustive-deps
};
