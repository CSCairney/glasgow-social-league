"use client";
import React from "react";
import styles from "./styles.module.scss";
import SportsButtons from "@/components/sports";

const Sports = () => {
    return (
        <div className={styles.container}>
            <SportsButtons />
        </div>
    );
}

export default Sports;