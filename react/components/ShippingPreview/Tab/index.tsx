import React, { FC, ReactNode } from "react";
import styles from "../shippingPreview.css";

interface TabProps {
    children?: ReactNode;
    label: string;
    activeTab: number;
    index: number;
    handleTabCallBack: (tabIndex: number, children: ReactNode) => void;
}

const Tab: FC<TabProps> = ({
    children,
    label,
    activeTab,
    index,
    handleTabCallBack: handleTabClick
}) => {
    return (
        <div className={`${styles.tabContainer}`}>
            <span
                className={
                    activeTab === index
                        ? `${styles.tab} ${styles.activeTab}`
                        : `${styles.tab} ${styles.nonActiveTab}`
                }
                onClick={() => handleTabClick(index, children)}
            >
                {label}
            </span>
        </div>
    );
};

export { Tab };
