import { useEffect, useRef } from "react";

const useSingleEffect = (effect) => {
    const isMounted = useRef(false);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            effect();
        }
    }, [effect]);
};

export default useSingleEffect;