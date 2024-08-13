import React from "react";
import style from "./styles.css";
import { CredisimanCuotas } from "../CredisimanCuotas";
import TagCuotasListItems from "../TagsCuotas/TagCuotasListItems";

export default function InstallmentTags() {
    return (
        <div className={style["installment-tags"]}>
            <CredisimanCuotas />
            <TagCuotasListItems />
        </div>
    );
}
