import React from "react";
import { useDevice } from "vtex.device-detector";
import styles from "./index.css";

interface ITituloeBanner {
    image: string;
    imageMobile: string;
    titulo: string;
    btnText: string;
    background: string;
    styleText: string;
    styleBtn: string;
}

const InfoCardCustom = ({
    image,
    imageMobile,
    titulo,
    btnText,
    background,
    styleBtn,
    styleText,
}: ITituloeBanner) => {
    const { device } = useDevice();

    return (
        <div className={styles.infoCard_container}>
            <div className={styles.infoCard_wrapper}>
                <div
                    className={styles.infoCard_text_content}
                    style={{
                        background: `${background}`,
                    }}
                >
                    <div
                        className={styles.infoCard_titulo}
                        style={{
                            color: `${styleText}`,
                        }}
                        dangerouslySetInnerHTML={{
                            __html: titulo,
                        }}
                    />
                    <div
                        className={styles.infoCard_btnText}
                        style={{
                            color: `${styleBtn}`,
                        }}
                        dangerouslySetInnerHTML={{
                            __html: btnText,
                        }}
                    />
                </div>

                <div className={styles.infoCard_image}>
                    <img
                        src={device == "phone" ? imageMobile : image}
                        alt="Banner"
                    />
                </div>
            </div>
        </div>
    );
};

InfoCardCustom.schema = {
    title: "Info Card Custom",
};

export default InfoCardCustom;
