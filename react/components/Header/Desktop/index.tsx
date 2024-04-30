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
    MenuItems: MenuItemsProps[];
    DropDownMenuProps: DropDownMenuProps;
}

const HeaderDesktop = ({
    desktopImage,
    SearchBar,
    WishList,
    Login,
    Minicart,
    MegaMenu,
    MenuItems,
    DropDownMenuProps,
}: HeaderDesktopProps) => {
    return (
        <div className={styles.containerHeaderDesktop}>
            <div className={styles.headerTop}>
                <div className={styles.headerTopLeft}>
                    <a className={styles.headerSimanLogo} href="/">
                        <img src={desktopImage} alt="Siman logo" />
                    </a>
                </div>
                <div className={styles.headerTopMiddle}>
                    <SearchBar />
                </div>
                <div className={styles.headerTopRight}>
                    <WishList />
                    <Login />
                    <Minicart />
                </div>
            </div>
            <div className={styles.headerBottom}>
                <div className={styles.headerBottomLeft}>
                    <MegaMenu />
                    <DropDownMenu
                        text={DropDownMenuProps.text}
                        menuImage={DropDownMenuProps.menuImage}
                        items={DropDownMenuProps.items}
                    />
                </div>
                <div className={styles.headerBottomMiddle}>|</div>
                <div className={styles.headerBottomMenuItems}>
                    {MenuItems.map((item) => (
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
