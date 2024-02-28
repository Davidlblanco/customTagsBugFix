import React, { ReactElement } from "react";

export default function ElementList({ elements, separator }: Props) {
    if (elements.length === 1) return <>{elements}</>;

    const indexToStopMap = 4;

    separator = separator ?? ", ";

    return (
        <>
            {elements.map((element, index) => {
                const isFirstItem = index === 0;

                if (index >= indexToStopMap) return;

                return (
                    <>
                        {!isFirstItem ? separator : ""}
                        {element}
                    </>
                );
            })}
        </>
    );
}

interface Props {
    elements: ReactElement[];
    separator?: string;
}
