import React from 'react';
import "./Cookies.css";


function CookiesAgreement() {
    var myClass = 'vtex-flex-layout-0-x-flexRow--cookies_modal';
    var storeValue = window.localStorage.getItem('value')

    storeValue == 'true' ? myClass = 'vtex-flex-layout-0-x-flexRow--cookies_modalOff' : myClass = 'vtex-flex-layout-0-x-flexRow--cookies_modal'

    function savePreference() {
        console.log("AHHHHHHHHH")
        if (window.localStorage.getItem('value') == null) {
            window.localStorage.setItem('value', true);
            myClass = 'vtex-flex-layout-0-x-flexRow--cookies_modalOff';
            console.log(storeValue)
        };
    };


    return (
        <div className={myClass} >
            <div>
                <h2>Este sitio web utiliza cookies</h2>
                <p>Esta web utiliza cookies propias y de terceros para ofrecerle una mejor experiencia y servicio. Al navegar o utilizar nuestros servicios acepta el uso que hacemos de las cookies.</p>
                <button className='vtex-flex-layout-0-x-flexRow--cookies_button' onClick={savePreference}>Aceptar</button>
            </div>
        </div>
    )

}

export default CookiesAgreement