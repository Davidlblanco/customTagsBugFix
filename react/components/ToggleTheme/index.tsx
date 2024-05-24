import React, { useEffect } from "react";

interface ToggleThemeProps {
    dark: boolean;
    darkClass: string;
}

const defaultDarkClass = "vtex-dark";

export function ToggleTheme({
    dark,
    darkClass = defaultDarkClass,
}: ToggleThemeProps) {
    const notDefaultDarkClass = darkClass !== defaultDarkClass;
    const pathname = window?.location?.pathname;

    useEffect(() => {
        dark
            ? document.body.classList.add(darkClass)
            : document.body.classList.remove(darkClass);
    }, []);

    useEffect(() => {
        if (pathname != "/" && notDefaultDarkClass) {
            document.body.classList.remove(darkClass);
        }
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
