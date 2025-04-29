import React, { useEffect, useState } from "react";
import styles from "./index.css";

function CookiesAgreement() {
    const [showComponent, setShowComponent] = useState(false);

    useEffect(() => {
        const cookiesAccepted = localStorage.getItem("cookies") === "true";
        setShowComponent(!cookiesAccepted);
    }, []);

    function savePreference() {
        localStorage.setItem("cookies", "true");
        setShowComponent(false);
    }

    if (!showComponent) {
        return null;
    }

    return (
        <div className={styles.cookiesModal} id="cookiesAgreement">
            <div>
                <h2>Este sitio web utiliza cookies</h2>
                <p>
                    En siman.com utilizamos cookies y recopilamos ciertos datos personales para mejorar tu experiencia
                    de navegación, personalizar contenidos y analizar el uso del sitio. Al continuar navegando, aceptas
                    nuestra{" "}
                    <a id={styles.cookiesAgreementLink} href="/privacidad">
                        Política de Privacidad
                    </a>{" "}
                    y el uso de cookies.
                </p>
                <button className={styles.cookiesButton} onClick={savePreference}>
                    Aceptar
                </button>
            </div>
        </div>
    );
}

export default CookiesAgreement;
