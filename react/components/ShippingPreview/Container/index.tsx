import React, { useState, ReactNode, useEffect } from "react";
import styles from "../shippingPreview.css";
import { Tab } from "../Tab";
import { PickUpChildren } from "../Children/pickupChildren";
import { useProduct } from "vtex.product-context";
import { SimulateCart } from "../Api/simulateCart";
import { GetPickUpPoints } from "../Api/getPickUpPoints";
import { PickupPointFiltered } from "../Types/types";

const Container = ({ children }) => {
    const productContext = useProduct();
    const [activeTab, setActiveTab] = useState(0);
    const [tabChildren, setTabChildren] = useState<ReactNode>();
    const [pickUpPoints, setPickUpPoints] = useState<PickupPointFiltered[]>([]);
    const productId = productContext?.selectedItem?.itemId;

    const handleTabClick = (tabIndex: number, children: ReactNode) => {
        setActiveTab(tabIndex);
        setTabChildren(children);
    };

    useEffect(() => {
        const fetchPickUpPoints = async () => {
            const result: PickupPointFiltered[] = await GetPickUpPoints();
            setPickUpPoints(result);
        };

        setTabChildren(children);
        fetchPickUpPoints();
    }, []);

    return (
        <div className={styles.shippingPreview}>
            <div className={styles.tabsContainer}>
                <Tab
                    activeTab={activeTab}
                    label="Envío a domicilio"
                    index={0}
                    handleTabCallBack={handleTabClick}
                >
                    {children}
                </Tab>
                <Tab
                    activeTab={activeTab}
                    label="Recoger en tienda"
                    index={1}
                    handleTabCallBack={handleTabClick}
                >
                    <PickUpChildren
                        pickUpPoints={pickUpPoints}
                        productId={productId}
                        index={1}
                        simulateCart={SimulateCart}
                    />
                </Tab>
            </div>
            <div
                style={
                    activeTab === 1 ? { display: "flex" } : { display: "block" }
                }
                className={styles.contentContainer}
            >
                {tabChildren}
            </div>
        </div>
    );
};

export { Container };
