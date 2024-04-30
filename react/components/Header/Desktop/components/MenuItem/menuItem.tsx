import React from "react";
import styles from "./styles.css";

export interface MenuItemsProps {
    href?: string;
    image?: string;
    text: string;
}

const MenuItem = ({ href, text, image }: MenuItemsProps) => {
    const Tag = href ? "a" : "div";

    return (
        <Tag className={styles.menuItem} href={href}>
            <img src={image} alt="menu item" /> {text}
        </Tag>
    );
};

export { MenuItem };
