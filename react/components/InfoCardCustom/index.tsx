import React from "react";
import { useDevice } from "vtex.device-detector";
import styles from "./index.css";
import RichText from "vtex.rich-text/index";

interface CtaColorObject {
  ctaColor?: string;
  ctaBackground?: string;
  selection?: string;
}

interface ITituloeBanner {
    isFullMode: boolean;
    fullModeTextWidth: string;
    fullModeImgWidth: string;
    imageDesktop: string;
    imageMobile: string;
    cardLink: string;
    titleText: string;
    titleSize: string;
    titleMargin: string;
    subtitleTextLink: boolean;
    subtitleText: string;
    subtitleSize: string;
    btnText: string;
    btnLink: string;
    backgroundColor: string;
    titlesColor: string;
    btnColor: string;
    isButton: boolean;
    btnBackground: string;
    blockClass: string | string[];
    ctaColor: string | string[] | CtaColorObject;
    titleTextWeight: boolean;
}

const splitAndValidate = (
    input: string | undefined,
    separator: string = "-",
    expectedParts: number = 2
): string[] => {
    if (!input) {
        return new Array(expectedParts).fill("");
    }
    const parts = input.split(separator);
    if (parts.length !== expectedParts) {
        return new Array(expectedParts).fill("");
    }
    return parts;
};

const InfoCardCustom = ({
    isFullMode,
    imageDesktop,
    imageMobile,
    cardLink,
    titleText,
    titleSize,
    titleMargin,
    subtitleTextLink,
    subtitleText,
    subtitleSize,
    btnText,
    btnLink,
    fullModeTextWidth,
    fullModeImgWidth,
    backgroundColor,
    btnColor,
    titlesColor,
    isButton,
    btnBackground,
    blockClass,
    ctaColor,
    titleTextWeight
}: ITituloeBanner) => {
    const { device } = useDevice();
    const isPhone = device === "phone";
    const imageUrl = isPhone ? imageMobile : imageDesktop;

   
    let ctaColorValue = "";
    let ctaBackgroundValue = "";
    let ctaSelection = "";

    if (typeof ctaColor === "object" && !Array.isArray(ctaColor)) {
      ctaColorValue = ctaColor.ctaColor ?? "";
      ctaBackgroundValue = ctaColor.ctaBackground ?? "";
      ctaBackgroundValue = ctaColor.ctaBackground ?? "";
      ctaSelection = ctaColor.selection ?? "";

  } else if (typeof ctaColor === "string") {
      ctaColorValue = ctaColor;
  }

    const ctaColorConfig = ctaColor && ctaSelection === "Color CTA Mobile" ? ctaColor : false;
    
    const [sizeTitleDesk, sizeTitleMob] = splitAndValidate(titleSize);
    const [sizeSubTitleDesk, sizeSubTitleMob] = splitAndValidate(subtitleSize);
    const [marginBottomTitleDesk, marginBottomTitleMob] =
        splitAndValidate(titleMargin);

    const renderButton = () => (
        <a
            className={`${styles.infoCard_btnText} ${
                isButton ? styles.infocard_buttonMode : ""
            }`}
            style={{
                color: isPhone && ctaColorConfig? ctaColorValue : btnColor,
                background: isButton ? isPhone && ctaColorConfig ? ctaBackgroundValue : btnBackground : "transparent",
            }}
            href={btnLink}
        >
            {btnText}
        </a>
    );

    console.log("titleTextWeight", titleTextWeight);

    const renderContent = () => (
        <>
            <div
                className={styles.infoCard_content_wrapper}
                style={{ color: titlesColor }}
            >
                <p
                    className={`${styles.infoCard_titulo} ${titleTextWeight ? styles.infoCard_titulo_weight : ''}`}
                    style={{
                        fontSize: isPhone ? sizeTitleMob : sizeTitleDesk,
                        marginBottom: isPhone
                            ? marginBottomTitleMob
                            : marginBottomTitleDesk,
                    }}
                >
                    <RichText text={titleText} />
                </p>
                <p
                    className={`${styles.infoCard_subtitulo} ${subtitleTextLink ? styles.infoCard_subtitleTextLink : ''}`}
                    style={{
                        fontSize: isPhone ? sizeSubTitleMob : sizeSubTitleDesk,
                    }}
                >
                    <RichText text={subtitleText} />
                </p>
            </div>
            {renderButton()}
        </>
    );

    const generateCustomClass = (originalClass: string) => {
        let blockClassArray: string[] = [];

        if (typeof blockClass === "string")
            blockClassArray = blockClass.split(" ");
        else blockClassArray = blockClass;

        const finalClass = blockClassArray?.map(
            (value) => `${originalClass}--${value}`
        );

        return finalClass.toString().replace(/,/g, " ");
    };

    return (
        <div className={styles.infoCard}>
            <a
                className={`${styles.infoCard_container} ${generateCustomClass(
                    styles.infoCard_container
                )}`}
                href={cardLink}
            >
                {!isFullMode ? (
                    <div className={styles.infoCard_wrapper_fullmode}>
                        <div
                            className={styles.infoCard_text_content}
                            style={{
                                background: backgroundColor,
                                width: fullModeTextWidth,
                            }}
                        >
                            {renderContent()}
                        </div>
                        <div
                            className={styles.infoCard_image}
                            style={{ width: fullModeImgWidth }}
                        >
                            <img
                                className={styles.infoCard_image_img}
                                src={imageUrl}
                                alt="Banner"
                            />
                        </div>
                    </div>
                ) : (
                    <div className={styles.infoCard_image_container}>
                        <img
                            src={imageUrl}
                            alt="Banner"
                            className={styles.infoCard_image}
                        />
                        {renderContent()}
                    </div>
                )}
            </a>
        </div>
    );
};

InfoCardCustom.schema = {
    titleText: "Info Card Custom",
};

export default InfoCardCustom;
