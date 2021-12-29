import React from "react";
import styles from "./styles.css";
import { useCssHandles } from "vtex.css-handles";
import useGiftWrapper from "../../hooks/useGiftWrapper";
import { FormattedMessage } from 'react-intl'
import cssBuilder from "../../utils/cssBuilder";
import icon from "./assets/gift.png";

export default function GiftWrapper() {
    const { handles } = useCssHandles(CSS_HANDLES, styles);
    const { isActive, hasAttachment, toggleAttachment } = useGiftWrapper('Regalo');

    if (!hasAttachment) return null;

    const classes = {
        container: cssBuilder(
            [handles['prod-wrapper-container']],
            [handles['prod-wrapper-active'], isActive]
        ),
        title: handles['prod-wrapper-title'],
        subtitle: handles['prod-wrapper-subtitle'],
        textContainer: handles['prod-wrapper-text-container'],
        iconContainer: handles['prod-wrapper-icon-container'],
        icon: handles['prod-wrapper-icon']
    }


    return (
        <section onClick={toggleAttachment} className={classes.container}>
            <div className={classes.textContainer}>
                <h4 className={classes.title}><FormattedMessage id='store/grift-wrapper.title' /></h4>
                <span className={classes.subtitle}><FormattedMessage id='store/grift-wrapper.subTitle' /></span>
            </div>
            <div className={classes.iconContainer}>
                <img className={classes.icon} src={icon} alt="gift wrapper icon" />
            </div>
        </section>
    )
}


const CSS_HANDLES = [
    "prod-wrapper-container",
    "prod-wrapper-active",
    "prod-wrapper-title",
    "prod-wrapper-subtitle",
    "prod-wrapper-text-container",
    "prod-wrapper-icon-container",
    "prod-wrapper-icon"
];