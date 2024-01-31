import React, { useState } from "react";
import { ReactImageTurntable} from "react-image-turntable";
import { ImagesProps } from "..";
import style from '../styles.module.css'

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
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="68"
                     height="38"
                     viewBox="0 0 68 38"
                     fill="none"
                  >
                     <g clip-path="url(#clip0_9_86)">
                     <path d="M13.8624 13.9276C8.44295 15.5897 5.02013 17.9397 5.02013 20.5762C5.02013 25.5053 17.1711 29.5747 32.4597 29.8039V35.0196C14.4329 34.733 0 29.632 0 23.3273C0 19.4872 5.47651 16.0483 13.8624 13.9276Z" fill="black"/>
                     <path d="M46.7215 28.8869C56.3053 27.3967 62.9228 24.2443 62.9228 20.5762C62.9228 17.997 59.557 15.5897 54.0805 13.9276C62.5235 16.0483 67.9429 19.4872 67.9429 23.3273C67.9429 28.1991 59.3288 32.3258 47.0067 34.1026L47.2349 38L35.5973 32.0965L46.5503 25.5053L46.7215 28.8869Z" fill="black"/>
                     <path d="M19.8523 21.0347C18.255 21.0347 16.7147 20.5762 15.7449 19.9457L16.3154 16.2775C17.3422 16.8507 18.312 17.0799 19.453 17.0799C21.1073 17.0799 21.8489 16.2202 21.8489 14.5581C21.8489 13.0679 21.1644 11.9216 18.4261 11.9216V8.53997C21.0503 8.53997 21.7919 7.68024 21.7919 6.0181C21.7919 4.75716 21.1644 4.18401 19.8523 4.18401C18.5973 4.18401 17.3993 4.81448 16.4865 5.78884L15.5167 2.00603C16.6577 0.859725 18.3691 0.057312 20.3087 0.057312C23.7885 0.057312 25.8422 2.12066 25.8422 5.73152C25.8422 7.50829 25.1577 9.11312 23.8456 10.0302C25.3858 10.8899 26.2416 12.4374 26.2416 14.5007C26.2416 18.4555 24.1879 21.0347 19.8523 21.0347Z" fill="black"/>
                     <path d="M33.6577 21.0347C29.8926 21.0347 27.7819 18.9713 27.7819 10.9472C27.7819 3.66817 30.1778 0 34.7416 0C35.9396 0 37.0235 0.171946 37.9362 0.630468L37.5369 4.69985C36.7953 4.35596 35.9396 4.24133 35.0839 4.24133C32.9731 4.24133 32.1745 5.38763 32.0033 7.85219L32.0604 7.9095C32.7449 7.39366 33.4866 7.10709 34.4564 7.10709C37.4228 7.10709 39.0201 9.22775 39.0201 13.3544C39.0201 18.9713 36.8523 21.0347 33.6577 21.0347ZM33.4295 10.8326C32.9731 10.8326 32.2886 11.2338 32.1745 11.8069C32.1174 16.4495 32.5738 17.1373 33.5436 17.1373C34.2852 17.1373 34.7986 16.3348 34.7986 13.2971C34.7986 11.5204 34.3993 10.8326 33.4295 10.8326Z" fill="black"/>
                     <path d="M45.8658 21.0347C41.9866 21.0347 40.4463 18.2262 40.4463 10.6606C40.4463 2.46455 42.0436 0.114624 45.9798 0.114624C49.802 0.114624 51.5705 2.46455 51.5705 10.6606C51.5134 18.2836 49.6879 21.0347 45.8658 21.0347ZM45.9798 4.29864C44.953 4.29864 44.6107 4.81447 44.6107 10.6033C44.6107 16.736 45.01 17.0799 45.9798 17.0799C46.9496 17.0799 47.349 16.5641 47.349 10.6033C47.2919 4.64253 46.8926 4.29864 45.9798 4.29864Z" fill="black"/>
                     <path d="M55.8489 11.8642C53.6241 11.8642 52.5402 10.8326 52.5402 6.82051C52.5972 2.86576 53.6811 1.71945 55.9059 1.71945C58.1308 1.71945 59.2147 2.86576 59.2147 6.82051C59.1576 10.8326 58.1308 11.8642 55.8489 11.8642ZM55.9059 9.8009C56.5335 9.8009 56.7046 9.39969 56.7046 6.82051C56.7046 4.24132 56.4764 3.89743 55.9059 3.89743C55.2784 3.89743 55.0502 4.24132 55.0502 6.82051C55.0502 9.45701 55.2784 9.8009 55.9059 9.8009Z" fill="black"/>
                     </g>
                     <defs>
                     <clipPath id="clip0_9_86">
                     <rect width="68" height="38" fill="white"/>
                     </clipPath>
                     </defs>
                  </svg>
                  <span className={style["modal-title-strong"]}>"Explora en 360°"</span>: Gira el producto con un simple gesto del mouse o el dedo
               </h4>

               <button
                  type="button"
                  className={style['modal-close']}
                  onClick={() => isVisible(false)}
               >
                  X
               </button>
            </div>

            {
               value && value.length > 0 && (
                  <ReactImageTurntable
                     images={imageURLs}
                     autoRotate={{ disabled: rotationDisabled, interval: 200 }}
                     onPointerDown={() => setRotationDisabled(true)}
                     onPointerUp={() => setRotationDisabled(false)}
                     onKeyDown={handleKeyDown}
                     onKeyUp={() => setRotationDisabled(false)}
                  />
               )
            }
         </div>
      </div>
   );
};
