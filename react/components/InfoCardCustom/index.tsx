import React from "react";
import { useDevice } from "vtex.device-detector";
import styles from "./index.css";
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
    subtitle: string;
    subtitleSize: string;
    btnText: string;
    btnLink: string;
    backgroundColor: string;
    titlesColor: string;
    btnColor: string;
    isButton: boolean;
    btnBackground: string;
    blockClass: string | string[];
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
    subtitle,
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
}: ITituloeBanner) => {
    const { device } = useDevice();
    const isPhone = device === "phone";
    const imageUrl = isPhone ? imageMobile : imageDesktop;

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
                color: btnColor,
                background: isButton ? btnBackground : "transparent",
            }}
            href={btnLink}
        >
            {btnText}
        </a>
    );

    const renderContent = () => (
        <>
            <div
                className={styles.infoCard_content_wrapper}
                style={{ color: titlesColor }}
            >
                <p
                    className={styles.infoCard_titulo}
                    style={{
                        fontSize: isPhone ? sizeTitleMob : sizeTitleDesk,
                        marginBottom: isPhone
                            ? marginBottomTitleMob
                            : marginBottomTitleDesk,
                    }}
                >
                    {titleText}
                </p>
                <p
                    className={styles.infoCard_subtitulo}
                    style={{
                        fontSize: isPhone ? sizeSubTitleMob : sizeSubTitleDesk,
                    }}
                >
                    {subtitle}
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
    );
};

InfoCardCustom.schema = {
    titleText: "Info Card Custom",
};

export default InfoCardCustom;
