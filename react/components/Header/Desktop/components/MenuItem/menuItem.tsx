import React from "react";
import styles from "./styles.css";

export interface MenuItemsProps {
    href?: string;
    image?: string;
    text: string;
    blockClass?: string;
}

const MenuItem = ({ href, text, image, blockClass }: MenuItemsProps) => {
    const Tag = href ? "a" : "div";

    return (
        <Tag
            className={blockClass ? styles[blockClass] : styles["menuItem"]}
            href={href}
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
