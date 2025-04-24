import React from "react";
import "./Cookies.css";

function CookiesAgreement() {
    const myClass = "vtex-flex-layout-0-x-flexRow--cookies_modal";

    function savePreference() {
        localStorage.setItem("cookies", "true");
        document.getElementsByClassName(myClass)[0].style.display = "none";
    }

    if (localStorage.getItem("cookies") === "true") {
        return null;
    } else {
        return (
            <div className={myClass} id="cookiesAgreement">
                <div>
                    <h2>Este sitio web utiliza cookies</h2>
                    <p>
                        En siman.com utilizamos cookies y recopilamos ciertos datos personales para mejorar tu
                        experiencia de navegación, personalizar contenidos y analizar el uso del sitio. Al continuar
                        navegando, aceptas nuestra <a href="/privacidad">Política de Privacidad</a> y el uso de cookies.
                    </p>
                    <button className="vtex-flex-layout-0-x-flexRow--cookies_button" onClick={savePreference}>
                        Aceptar
                    </button>
                </div>
            </div>
        );
    }
}

export default CookiesAgreement;
