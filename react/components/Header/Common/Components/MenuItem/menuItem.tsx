import React from "react";
import styles from "./styles.css";

export interface MenuItemsProps {
    href?: string;
    image?: string;
    text: string;
    blockClass?: string;
    isDarkMode?: boolean;
}

const MenuItem = ({
    href,
    text,
    image,
    blockClass,
    isDarkMode = false,
}: MenuItemsProps) => {
    const Tag = href ? "a" : "div";

    return (
        <Tag
            className={blockClass ? styles[blockClass] : styles["menuItem"]}
            href={href}
            style={isDarkMode ? { color: "#F1F1F1" } : { color: "#1f1f1f" }}
        >
            {image && (
                <img
                    className={styles.menuItemImage}
                    src={image}
                    alt="menu item"
                />
            )}
            {text}
        </Tag>
    );
};

export { MenuItem };
