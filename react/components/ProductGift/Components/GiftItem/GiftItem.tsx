import React from "react";
import { Gift } from "../../Types/productGiftTypes";
import { RegaliaIcon } from "../../Assets/ant-design_gift-outlined";
import styles from "./styles.css";

const GiftItem = ({ gift }: { gift: Gift }) => {
   return (
      <div className={styles.containerGiftItem}>
         <div className={styles.leftGift}>
            <div className={styles.leftTopGift}>
               <RegaliaIcon />
               <span className={styles.regaliaText}>Regalia</span>
            </div>
            <div className={styles.leftBottomGift}>
               <span className={styles.giftName}>{gift.productName}</span>
            </div>
         </div>
         <div className={styles.rightGift}>
            <img width={80} height={80} src={gift.images[0].imageUrl} alt={gift.images[0].imageText} />
         </div>
      </div>
   );
};

export { GiftItem };
