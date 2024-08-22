import { Metadata } from "next";
import React from "react";
import styles from "./styles.module.scss";

export const metadata: Metadata = {
    title: "Leaderboard | GSL",
    description: 'Leaderboard of the GSL',
  };
  
const Leaderboard = () => {
    return (
        <div className={styles.leaderboard}>
            <h1>Leaderboard</h1>
        </div>
    );
}

export default Leaderboard;