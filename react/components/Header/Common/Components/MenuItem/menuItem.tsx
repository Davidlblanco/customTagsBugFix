import React from "react";
import { useHeaderContext } from "../../../Context/headerContext";
import styles from "./styles.css";

export interface MenuItemsProps {
    href?: string;
    image?: string;
    text: string;
    blockClass?: string;
}

const MenuItem = ({ href, text, image, blockClass }: MenuItemsProps) => {
    const { isDarkMode } = useHeaderContext();

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
