import React from "react";
import { useDevice } from "vtex.device-detector";
import styles from "./index.css";

interface ITituloeBanner {
    isFullMode: boolean;
    widthContentText: string;
    widthContentImg: string;
    image: string;
    imageMobile: string;
    imageActionUrl: string;
    titulo: string;
    sizeTitulo: string;
    marginTitulo: string;
    subtitle: string;
    sizeSubTitulo: string;
    btnText: string;
    btnLink: string;
    background: string;
    styleText: string;
    styleBtn: string;
    buttonMode: boolean;
    backgroundBtn: string;
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
    image,
    imageMobile,
    imageActionUrl,
    titulo,
    sizeTitulo,
    marginTitulo,
    subtitle,
    sizeSubTitulo,
    btnText,
    btnLink,
    widthContentText,
    widthContentImg,
    background,
    styleBtn,
    styleText,
    buttonMode,
    backgroundBtn,
}: ITituloeBanner) => {
    const { device } = useDevice();
    const isPhone = device === "phone";
    const imageUrl = isPhone ? imageMobile : image;

    const [sizeTitleDesk, sizeTitleMob] = splitAndValidate(sizeTitulo);
    const [sizeSubTitleDesk, sizeSubTitleMob] = splitAndValidate(sizeSubTitulo);
    const [marginBottomTitleDesk, marginBottomTitleMob] =
        splitAndValidate(marginTitulo);

    const renderButton = () => (
        <a
            className={`${styles.infoCard_btnText} ${
                buttonMode ? styles.infocard_buttonMode : ""
            }`}
            style={{
                color: styleBtn,
                background: buttonMode ? backgroundBtn : "transparent",
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
                style={{ color: styleText }}
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
                    {titulo}
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

    return (
        <div className={styles.infoCard_container}>
            {!isFullMode ? (
                <div className={styles.infoCard_wrapper_fullmode}>
                    <div
                        className={styles.infoCard_text_content}
                        style={{
                            background: background,
                            width: widthContentText,
                        }}
                    >
                        {renderContent()}
                    </div>
                    <div
                        className={styles.infoCard_image}
                        style={{ width: widthContentImg }}
                    >
                        <a href={imageActionUrl}>
                            <img
                                className={styles.infoCard_image_img}
                                src={imageUrl}
                                alt="Banner"
                            />
                        </a>
                    </div>
                </div>
            ) : (
                <div className={styles.infoCard_image_relative}>
                    <img src={imageUrl} alt="Banner" />
                    {renderContent()}
                </div>
            )}
        </div>
    );
};

InfoCardCustom.schema = {
    title: "Info Card Custom",
};

export default InfoCardCustom;
