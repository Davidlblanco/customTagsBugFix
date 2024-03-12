import React, { ReactElement } from "react";
import { v4 as uuidv4 } from "uuid";

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
                    <span key={uuidv4()}>
                        {!isFirstItem ? separator : ""}
                        {element}
                    </span>
                );
            })}
        </>
    );
}

interface Props {
    elements: ReactElement[];
    separator?: string;
}
