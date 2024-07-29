import { useEffect, useState } from "react";
import { canUseDOM } from "vtex.render-runtime";

export default function useScreenSize() {
    const [screenSize, setScreenSize] = useState(getScreenSize());

    useEffect(() => {
        if (!canUseDOM) return;

        const handleResize = () => setScreenSize(getScreenSize());
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return screenSize;
}

function getScreenSize() {
    if (!canUseDOM) {
        return {
            width: 0,
            height: 0,
        };
    }

    return {
        width: window.innerWidth,
        height: window.innerHeight,
    };
}
