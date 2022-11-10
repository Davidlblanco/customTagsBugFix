import React from 'react';

import styles from "./styles.css";

const FiraSiman = () => {
    return (
      <div className={styles.firaContainer}>

        <div id='fira-siman'></div>
        
        <script src="https://firalivepro.blob.core.windows.net/fira-live-widget/index.min.js" id="fira-live-widget" fira-key="6362f88266e0136a7056f59e"></script>

        <script>setupIframePlayerWithLatestLive('fira-siman');</script>

      </div>
/*       <div className={styles.firaContainer}>
        iheyrgblieahrigeau
      </div> */
    )

}

export {FiraSiman}