import React from "react";

const ArrowLeftIcon = (
    props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
    <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M16 6.66669L6.66666 16M6.66666 16L16 25.3334M6.66666 16H25.3333"
            stroke="#F1F1F1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export { ArrowLeftIcon };
