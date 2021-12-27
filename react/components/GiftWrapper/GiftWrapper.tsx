import React from "react";
import styles from "./styles.css";
import { useCssHandles } from "vtex.css-handles";
import useGiftWrapper from "../../hooks/useGiftWrapper";
import cssBuilder from "../../utils/cssBuilder";

export default function GiftWrapper() {
    const { handles } = useCssHandles(CSS_HANDLES, styles);
    const { isActive, toggleActive } = useGiftWrapper('Regalo');

    const classes = {
        container: cssBuilder(
            [handles["container"]],
            [handles["active"], isActive]
        )
    }


    return <div onClick={toggleActive} className={classes.container}>Presente</div>
}


const CSS_HANDLES = [
    "container",
    "active"
];