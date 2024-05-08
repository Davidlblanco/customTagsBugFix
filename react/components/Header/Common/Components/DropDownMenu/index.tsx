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
                    isDarkMode={isDarkMode}
                />
            </button>

            {isOpen && (
                <div className={styles.dropDownMenuContainer}>
                    {items.map((item) => (
                        <MenuItem
                            key={item?.href + item.text}
                            text={item.text}
                            image={item?.image}
                            href={item.href}
                            isDarkMode={false}
                        />
                    ))}
                </div>
            )}
        </>
    );
};

export { DropDownMenu };
