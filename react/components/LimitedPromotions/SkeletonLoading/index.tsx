import React from 'react'

import styles from '../styles.css'

export function SkeletonLoading() {
  return (
    <div className={styles.skeleton}>
      <span
        className={`${styles['skeleton-text']} ${styles['skeleton-box']}`}
      />
    </div>
  )
}