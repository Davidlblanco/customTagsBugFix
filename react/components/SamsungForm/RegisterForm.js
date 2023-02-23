import React from 'react';
//import module css
import "./Global.css"

function RegisterForm() {
    return (
        <React.Fragment>
            <h1>¡Regístrate para conocer el Nuevo Galaxy!</h1>
            <h3>Todos los campos marcados (*) son mandatorios.</h3>
            <small>Ingresa tus datos para recibir las últimas novedades.</small>


            <section>
                <form id="form" className="form" method="POST">
                    <div className="form-group">
                        <label for="">*Nombre:</label>
                        <input type="text" name="first_name" autocomplete="off" className="form-control" maxlength="99" required="" pattern=".{2,99}" title="Mín. 2 - Máx. 99 Carácteres" />
                    </div>

                    <div className="form-group">
                        <label for="">*Apellido:</label>
                        <input type="text" name="last_name" autocomplete="off" className="form-control" maxlength="99" required="" pattern=".{2,99}" title="Mín. 2 - Máx. 99 Carácteres" />
                    </div>

                    <div className="form-group">
                        <label for="">*Email:</label>
                        <input type="email" name="email" autocomplete="off" className="form-control" maxlength="99" required="" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" title="ejemplo@ejemplo.com / Máx. 99 Carácteres" />
                    </div>

                    <div className="form-group">
                        <label for="">*País:</label>
                        <select name="id_country" id="id_country" required="" className="form-control">
                            <option value="El Salvador">El Salvador</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label for="">*Operadora Actual:</label>
                        <select name="id_oper" id="id_oper" required="" className="form-control">
                            <option value="">Seleccione...</option>
                            <option value="Claro">Claro</option>
                            <option value="Digicel">Digicel</option>
                            <option value="Movistar">Movistar</option>
                            <option value="Tigo">Tigo</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label for="">*Smartphone Actual:</label>
                        <select name="modelo" id="modelo" required="" className="form-control">
                            <option value="">Seleccione...</option>
                            <option value="fold-flip">Fold/Flip</option>
                            <option value="serie-s22">Serie S22</option>
                            <option value="serie-note20">Serie Note20</option>
                            <option value="serie-a">Serie A</option>
                            <option value="otros-androids">Otros Androids</option>
                            <option value="iphone">Iphone</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label for="">*Número de teléfono:</label>
                        <div className="iti iti--allow-dropdown">
                            <div className="iti__flag-container">
                                <div className="iti__selected-flag" role="combobox" aria-owns="country-listbox" tabindex="0" title="Unknown">
                                    <div className="iti__flag iti__"></div>
                                    <div className="iti__arrow"></div>
                                </div>
                            </div>
                            <input type="tel" name="phone" autocomplete="off" maxlength="20" className="form-control" required="" data-intl-tel-input-id="0" />
                            <input type="hidden" name="full_phone" />
                        </div>
                    </div>

                    <div className="w-100">
                        <label for=""><b>*¿En qué productos estás interesado?</b></label>
                    </div>

                    <div className="w-100 form-group2">
                        <div className="w-100 squaredFour flex align_items_center noWrap">
                            <input type="checkbox" id="gint1" name="ginterest[1]" value="Telefonos" />
                            <label className="checkbox" for="gint1"></label>
                            <label for="gint1" className="pointer">Teléfonos</label>
                        </div>
                        <div className="w-100 squaredFour flex align_items_center noWrap">
                            <input type="checkbox" id="gint2" name="ginterest[2]" value="Tablets" />
                            <label className="checkbox" for="gint2"></label>
                            <label for="gint2" className="pointer">Tablets</label>
                        </div>
                        <div className="w-100 squaredFour flex align_items_center noWrap">
                            <input type="checkbox" id="gint3" name="ginterest[3]" value="Accesorios" />
                            <label className="checkbox" for="gint3"></label>
                            <label for="gint3" className="pointer">Accesorios</label>
                        </div>
                    </div>

                    <div className="w-100" >
                        <label for=""><b>*¿Qué buscas para tu nuevo Galaxy?</b></label>
                    </div>

                    <div className="w-100 form-group2">
                        <div className="w-100 squaredFour flex align_items_center  noWrap">
                            <input type="checkbox" id="why" name="why" value="Mejor cámara" /> 
                            <label className="checkbox" for="why"></label><label for="why" className="pointer">Mejor Cámara</label>
                        </div>

                        <div className="w-100 squaredFour flex align_items_center  noWrap"><input type="checkbox" id="why1" name="why1" value="Diseño premium" /> <label className="checkbox" for="why1"></label><label for="why1" className="pointer">Diseño Premium</label>
                        </div>
                        <div className="w-100 squaredFour flex align_items_center  noWrap"><input type="checkbox" id="why2" name="why2" value="Mejor batería" /> <label className="checkbox" for="why2"></label><label for="why2" className="pointer">Mejor Batería</label>
                        </div>
                        <div className="w-100 squaredFour flex align_items_center  noWrap"><input type="checkbox" id="why3" name="why3" value="Resistencia al agua y al polvo" /> <label className="checkbox" for="why3"></label><label for="why3" className="pointer">Resistencia al agua y al polvo</label>
                        </div>
                        <div className="w-100 squaredFour flex align_items_center  noWrap"><input type="checkbox" id="why4" name="why4" value="Mejor experiencia de videojuegos" /> <label className="checkbox" for="why4"></label><label for="why4" className="pointer">Mejor experiencia de videojuegos</label>
                        </div>
                        <div className="w-100 squaredFour flex align_items_center  noWrap"><input type="checkbox" id="why5" name="why5" value="Experiencia de realidad virtual mejorada" /> <label className="checkbox" for="why5"></label><label for="why5" className="pointer">Experiencia de realidad virtual mejorada</label>
                        </div>
                    </div>

                    <div className="form-group w-100 center">
                        <button type="submit">Registrarme</button>
                    </div>

                </form>

            </section>

        </React.Fragment>
    );
}

export default RegisterForm;