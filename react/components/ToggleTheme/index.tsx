import React, { useEffect } from "react";

interface ToggleThemeProps {
    dark: boolean;
    darkClass: string;
}

export function ToggleTheme({
    dark,
    darkClass = "vtex-dark",
}: ToggleThemeProps) {
    const pathname = window?.location?.pathname;
    useEffect(() => {
        dark
            ? document.body.classList.add(darkClass)
            : document.body.classList.remove(darkClass);
    }, []);

    useEffect(() => {
        console.log("pathname: ", pathname);
        if (pathname != "/") document.body.classList.remove(darkClass);
    }, [pathname]);

    return <></>;
}

ToggleTheme.schema = {
    title: "Cambiar Tema",
    type: "object",
    properties: {
        dark: {
            title: "Dark",
            type: "boolean",
        },
        darkClass: {
            title: "Nombre de la clase",
            type: "string",
        },
    },
};
