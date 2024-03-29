import React from 'react';

import styles from './NotFoundBlock.module.scss'

export const NotFoundBlock = () => {
    return (
        <div className={styles.root}>
            <h1 >
                <span>&#128121;</span>
                <br />
                Ничего не найдено
            </h1>
            <p className={styles.description}>К сожалению, такой страницы нет.</p>
        </div>
    );
};