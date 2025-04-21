import React from 'react';
import { Gift } from "../../Types/productGiftTypes";
import styles from "./styles.css";

const GiftItem = ({ gifts }: { gifts: Gift[] }) => {

   return (
      <div className={styles.containerGiftItemDior}>
         <div className={styles.centerGiftDior}>
            {gifts.length === 1 && (
               <span className={styles.giftNameDior}>{gifts[0].productName.replace(/\/\/.*/, "").trim()}</span>
            )}
         </div>
         <div className={styles.rightGiftDior}>
            {gifts.length === 1 && (
               <img src={gifts[0].images[0].imageUrl} alt={gifts[0].images[0].imageText} className={styles.imgGiftDior} />
            )}
         </div>
      </div>
   );
};

export { GiftItem };
