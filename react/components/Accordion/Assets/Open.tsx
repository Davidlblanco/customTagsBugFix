import React from "react";

const OpenIcon = (
    props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <rect x="9" y="2" width="2" height="16" rx="1" fill="#1F1F1F" />
        <rect
            x="2"
            y="11"
            width="2"
            height="16"
            rx="1"
            transform="rotate(-90 2 11)"
            fill="#1F1F1F"
        />
    </svg>
);

export { OpenIcon };
