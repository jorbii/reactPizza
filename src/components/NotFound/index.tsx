import React from 'react'
import styles from './NotFoundBlock.module.scss'

export const NotfoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
        <h1>
            Not found
        </h1>

        <p className= {styles.description} 
        >This page is not available on our website
        </p>

    </div>
  )
}

export default NotfoundBlock;