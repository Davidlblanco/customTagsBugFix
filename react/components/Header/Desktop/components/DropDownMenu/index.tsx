import React, { useState } from "react";
import { MenuItem, MenuItemsProps } from "../MenuItem/menuItem";
import styles from "./styles.css";

export interface DropDownMenuProps {
    menuImage: string;
    text: string;
    items: MenuItemsProps[];
}

const DropDownMenu = ({ menuImage, text, items }: DropDownMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                className={styles.dropDownContainer}
                onClick={() => setIsOpen(!isOpen)}
            >
                <MenuItem href="" text={text} image={menuImage} />
            </button>

            {isOpen && (
                <div className={styles.dropDownMenuContainer}>
                    {items.map((item) => (
                        <MenuItem
                            key={item?.href}
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
