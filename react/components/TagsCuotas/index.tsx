import React from "react";
import style from "./styles.css";
import TagCuotasListItems from "./TagCuotasListItems";

const TagsCuotas = () => {
    return (
        <div className={style.containerTagsCuotas}>
            <TagCuotasListItems />
        </div>
    );
};

export default TagsCuotas;
