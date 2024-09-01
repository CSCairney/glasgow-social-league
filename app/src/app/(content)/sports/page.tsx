"use client";
import React from "react";
import styles from "./styles.module.scss";
import SportsButtons from "../../../components/sports/components/SportsButtons";

const Sports = () => {
    return (
        <div className={styles.container}>
            <SportsButtons />
        </div>
    );
}

export default Sports;