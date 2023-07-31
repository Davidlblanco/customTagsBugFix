import React from 'react';
import "./Cookies.css";


function CookiesAgreement() {
  const myClass = 'vtex-flex-layout-0-x-flexRow--cookies_modal';

  function savePreference() {
    localStorage.setItem('cookies', 'true');
    document.getElementsByClassName(myClass)[0].style.display = 'none';
  }

  if (localStorage.getItem('cookies') === 'true') {
    return null;
  } else {
    return (
      <div className={myClass} id="cookiesAgreement">
        <div>
          <h2>Este sitio web utiliza cookies</h2>
          <p>Esta web utiliza cookies propias y de terceros para ofrecerle una mejor experiencia y servicio. Al navegar o utilizar nuestros servicios acepta el uso que hacemos de las cookies.</p>
          <button className='vtex-flex-layout-0-x-flexRow--cookies_button' onClick={savePreference}>Aceptar</button>
        </div>
      </div>
    );
  }
}

export default CookiesAgreement