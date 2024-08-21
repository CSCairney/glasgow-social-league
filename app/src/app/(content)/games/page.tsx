import { Metadata } from "next";
import React from "react";
import styles from "./styles.module.scss";

export const metadata: Metadata = {
    title: "Games | GSL",
    description: 'Pick your game.',
  };

const Games = () => {
    return (
        <div className={styles.contact}>
            <h1>Games</h1>
        </div>
    );
}

export default Games;