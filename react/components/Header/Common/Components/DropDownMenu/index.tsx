import React, { useState } from "react";
import { MenuItem, MenuItemsProps } from "../MenuItem/menuItem";
import { useHeaderContext } from "../../../Context/headerContext";
import styles from "./styles.css";

export interface DropDownMenuProps {
    menuImage: string;
    menuImageDark: string;
    text: string;
    items: MenuItemsProps[];
}

const DropDownMenu = ({
    menuImage,
    menuImageDark,
    text,
    items,
}: DropDownMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { isDarkMode } = useHeaderContext();

    return (
        <>
            <button
                className={styles.dropDownContainer}
                onClick={() => setIsOpen(!isOpen)}
            >
                <MenuItem
                    blockClass="megaMenu"
                    text={text}
                    image={isDarkMode ? menuImageDark : menuImage}
                />
            </button>

            {isOpen && (
                <div
                    className={styles.dropDownMenuContainer}
                    style={
                        isDarkMode
                            ? { backgroundColor: "#4D4D4D" }
                            : { backgroundColor: "#e9e9e9" }
                    }
                >
                    {items.map((item) => (
                        <MenuItem
                            key={item?.href + item.text}
                            text={item.text}
                            image={item?.image}
                            href={item.href}
                        />
                    ))}
                </div>
            )}
        </>
    );
};

export { DropDownMenu };
