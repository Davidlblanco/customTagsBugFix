import React, { FormEvent } from "react";
import { usePageContext } from "../Context/PageContext";
// import getOrderData from "../api/getOrderData";
import styles from "./InputPage.css";
import Recaptcha from 'react-grecaptcha';

const InputPage = () => {
  const {setPage, setOrder, order, setVtexOrderData, setLoading, setMockOrderData, setIsVtexOrder} = usePageContext();

  const getSimanOrderInformation = async () =>{
    const response = await fetch(`https://logistica.siman.com/tracking/orders/find?numero_orden=${order}`,{
      method: "GET"
    })
    return response.json();
  }

  

  const getVtexOrderInformation = async () => {
    const response = await fetch(
        `/_v/getUserOrder/${order}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        }
    );
    return response.json();
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setPage("StatusPage");
    setLoading(true);
    // setMockOrderData(getOrderData())
    const siman = await getSimanOrderInformation();
    setMockOrderData(siman);
    if(siman?.body?.canal_digital){
      setIsVtexOrder(true);
      setVtexOrderData(await getVtexOrderInformation());
    }
    setLoading(false);
  };
    
  const handleOrder = (event: FormEvent<HTMLInputElement>) => {
    setOrder(event?.currentTarget?.value);
  };

  const verifyCallback = (response: any) => {
    if (response) {
      let btSubmit = document.getElementById("btnBubmit") as HTMLButtonElement;
      if (btSubmit)
        btSubmit.disabled = false;
    }
  };

  const expiredCallback = () => { };
  
  return (
    <div>
      <form className={styles.container_orderNumber} onSubmit={handleSubmit}>
        <div className={styles.orderNumberDiv}>
          <label htmlFor="order">Número de Orden</label>
          <input type="text" name="order" id="order" required onChange={handleOrder} />
          <button id="btnBubmit" type="submit" disabled >Consultar</button>
        </div>
        <Recaptcha sitekey="6LfTGMchAAAAAHpk8g09kh7Ns63naS0gzdSo54mn" callback={verifyCallback} expiredCallback={expiredCallback} locale="es-CO"/>
      </form>
    </div>
  );
};

export { InputPage };
