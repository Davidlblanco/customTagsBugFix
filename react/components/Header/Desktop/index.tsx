import React, { ComponentType } from "react";
import { MenuItem, MenuItemsProps } from "./components/MenuItem/menuItem";
import { DropDownMenu, DropDownMenuProps } from "./components/DropDownMenu";
import styles from "./styles.css";

interface HeaderDesktopProps {
    desktopImage: string;
    SearchBar: ComponentType;
    WishList: ComponentType;
    Login: ComponentType;
    Minicart: ComponentType;
    MegaMenu: ComponentType;
    headerItems: MenuItemsProps[];
    dropDownMenu: DropDownMenuProps;
}

const HeaderDesktop = ({
    desktopImage,
    SearchBar,
    WishList,
    Login,
    Minicart,
    MegaMenu,
    headerItems,
    dropDownMenu,
}: HeaderDesktopProps) => {
    return (
        <div className={styles.containerHeaderDesktop}>
            <div className={styles.headerTop}>
                <div>
                    <a className={styles.headerSimanLogo} href="/">
                        <img src={desktopImage} alt="Siman logo" />
                    </a>
                </div>
                <div>
                    <SearchBar />
                </div>
                <div>
                    <WishList />
                    <Login />
                    <Minicart />
                </div>
            </div>
            <div className={styles.headerBottom}>
                <MegaMenu />
                <DropDownMenu
                    text={dropDownMenu.text}
                    menuImage={dropDownMenu.menuImage}
                    items={dropDownMenu.items}
                />
                <div>|</div>
                <div className={styles.headerBottomMenuItems}>
                    {headerItems.map((item) => (
                        <MenuItem
                            key={item.href + item.text}
                            href={item.href}
                            image={item?.image}
                            text={item.text}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export { HeaderDesktop };
