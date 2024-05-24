import React, { useState, useEffect, useRef } from "react";
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
    const dropDownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropDownRef.current &&
                !dropDownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        window.addEventListener("click", handleClickOutside);

        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const toggleDropDown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.dropDown} ref={dropDownRef}>
            <button
                className={styles.dropDownContainer}
                onClick={toggleDropDown}
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
        </div>
    );
};

export { DropDownMenu };
