import React from 'react'

import styles from '../styles.css'

export function SkeletonLoading() {
  return (
    <div className={styles.skeleton}>
      <span
        className={`${styles['skeleton-text']} ${styles['skeleton-box']}`}
      />

      <div className={styles['skeleton-price-container']}>
        <span
          className={`${styles['skeleton-price']} ${styles['skeleton-box']}`}
        />
        <span
          className={`${styles['skeleton-price-percentage']} ${styles['skeleton-box']}`}
        />
        <span
          className={`${styles['skeleton-price-img']} ${styles['skeleton-box']}`}
        />
      </div>
    </div>
  )
}
