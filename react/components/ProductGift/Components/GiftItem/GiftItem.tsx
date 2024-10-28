import React, { useState, useEffect } from 'react';
import { Gift } from "../../Types/productGiftTypes";
import { RegaliaIcon } from "../../Assets/ant-design_gift-white";
import styles from "./styles.css";

const GiftItem = ({ gifts }: { gifts: Gift[] }) => {

   const [currentIndex, setCurrentIndex] = useState(0);

   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentIndex((prevIndex) =>
            prevIndex === gifts.length - 1 ? 0 : prevIndex + 1
         );
      }, 3000);

      return () => clearInterval(interval);
   }, [gifts.length]);

   return (
      <div className={styles.containerGiftItem}>
         <div className={styles.leftGift}>
            <RegaliaIcon className={styles.regaliaIcon} />
         </div>
         <div className={styles.centerGift}>
            <span className={styles.regaliaText}>{gifts.length > 1 ? gifts.length + " regalías disponibles" : "Regalía"}</span>
            {gifts.length > 1 &&gifts.map((gift, index) => (
               <span className={`${styles.giftNameList} ${index === currentIndex ? styles.active : ''}`} key={index}
               > ● {gift.productName.replace(/\/\/.*/, "").trim()}</span>
            ))}
            {gifts.length === 1 && (
               <span className={styles.giftName}>{gifts[0].productName.replace(/\/\/.*/, "").trim()}</span>
            )}
         </div>
         <div className={styles.rightGift}>
            {gifts.length > 1 && gifts.map((gift, index) => (
               <div
                  key={index}
                  className={`${styles.carouselItem} ${index === currentIndex ? styles.active : ''
                     }`}
                  style={{ display: index === currentIndex ? 'block' : 'none' }}
               >
                  <img src={gift.images[0].imageUrl} alt={gift.images[0].imageText} className={styles.imgGift} />
               </div>
            ))}
            {gifts.length === 1 && (
               <img src={gifts[0].images[0].imageUrl} alt={gifts[0].images[0].imageText} className={styles.imgGift} />
            )}
         </div>
      </div>
   );
};

export { GiftItem };
