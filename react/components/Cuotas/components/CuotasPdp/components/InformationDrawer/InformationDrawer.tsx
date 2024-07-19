import React from "react";
import { Drawer, DrawerHeader, DrawerCloseButton } from "vtex.store-drawer";

import OtherCards from "../OtherCards/OtherCards";

import { GenericTagsFront } from "../../../../Types/PaymentCustom";
import { BestInstallment } from "../../../../Types/BestInstallment";
import { Results } from "../../../../Types/Results";

import style from './styles.css';
import CredisimanCards from "../CredisimanCards/CredisimanCards";

interface InformationDrawerProps {
    tagsPreview?: GenericTagsFront | null;
    bestInstallment?: BestInstallment;
    results: Results[];
}

const InformationDrawer = ({
    tagsPreview,
    bestInstallment,
    results
}: InformationDrawerProps) => {
    const values: InformationDrawerProps = {
        tagsPreview,
        bestInstallment,
        results
    }
    return (
        <Drawer
            header={
                <DrawerHeader>
                    <DrawerCloseButton />
                </DrawerHeader>
            }
            position="right"
            slideDirection="rightToLeft"
            customIcon={<span className={`${style.iconInformation}`}>Más información</span>}
            maxWidth={348}
        >
            <div className={`${style.wrapDrawerContent}`}>
                <CredisimanCards
                    values={values}
                />
                <OtherCards
                    values={values}
                />
            </div>
        </Drawer>
    )
}

export default InformationDrawer;