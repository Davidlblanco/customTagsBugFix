import React, { useState } from "react";
import { ReactImageTurntable } from "react-image-turntable";
import { ImagesProps } from "..";
import style from '../styles.module.css'
import Close from "../Icons/CloseModal360";
import Icon360 from "../Icons/Modal360";

interface PreviewImages360Props {
   value: ImagesProps[] | null | undefined;
   isVisible: (visible: boolean) => void;
}

export const PreviewImages360: React.FC<PreviewImages360Props> = ({ value, isVisible }) => {
   const [rotationDisabled, setRotationDisabled] = useState(false);

   const handleKeyDown = (ev: React.KeyboardEvent<HTMLDivElement>) => {
      if (rotationDisabled) return;

      if (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight') {
         setRotationDisabled(true);
      }
   };

   const imageURLs = value?.map((image) => image.url) || []

   return (
      <div className={style['modal-overlay']}>
         <div className={style['modal-wrapper']}>
            <div className={style['modal-header']}>
               <h4 className={style['modal-title']}>
                  <Icon360 />
                  <span className={style["modal-title-strong"]}>"Explora en 360°:</span>
                  <span className={style["modal-title-text"]}>Gira el producto con un simple gesto del mouse o el dedo"</span>
               </h4>
               <button
                  type="button"
                  className={style['modal-close']}
                  onClick={() => isVisible(false)}
               >
                  <Close />
               </button>
            </div>
            {value && value.length > 0 && (
               <ReactImageTurntable
                  images={imageURLs}
                  autoRotate={{ disabled: rotationDisabled, interval: 200 }}
                  onPointerDown={() => setRotationDisabled(true)}
                  onPointerUp={() => setRotationDisabled(false)}
                  onKeyDown={handleKeyDown}
                  onKeyUp={() => setRotationDisabled(false)}
               />
            )}
         </div>
      </div>
   );
};
