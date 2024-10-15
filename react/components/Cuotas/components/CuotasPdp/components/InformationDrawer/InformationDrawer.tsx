import React from "react";
import { Drawer, DrawerHeader, DrawerCloseButton } from "vtex.store-drawer";

import OtherCards from "../OtherCards/OtherCards";
import CredisimanCards from "../CredisimanCards/CredisimanCards";

import { GenericTagsFront } from "../../../../Types/PaymentCustom";
import { Results } from "../../../../Types/Results";

import style from './styles.css';

interface InformationDrawerProps {
    credisimanResults: Results[];
    otherResults: Results[];
    updateCredisimanTagsPreview?: GenericTagsFront | null;
    updateOthersTagsPreview?: GenericTagsFront | null;
}

const InformationDrawer = ({
    credisimanResults,
    otherResults,
    updateCredisimanTagsPreview,
    updateOthersTagsPreview
}: InformationDrawerProps) => {
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
                    values={{
                        updateCredisimanTagsPreview,
                        credisimanResults
                    }}
                />
                <OtherCards
                    values={{
                        updateOthersTagsPreview,
                        otherResults
                    }}
                />
            </div>
        </Drawer>
    )
}

export default InformationDrawer;