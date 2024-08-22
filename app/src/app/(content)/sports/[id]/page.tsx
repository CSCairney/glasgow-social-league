"use client";
import React from "react";
import styles from "./styles.module.scss";
import {useAppSelector} from "@/app/store";
import SessionCreate from "../../../../components/sports/components/SessionCreate";

const SelectedSport = () => {
    const selectedSport = useAppSelector(state => state.sport.name);
    return (
        <div className={styles.container}>
            <h4 className={styles.title}>{selectedSport}</h4>
            <SessionCreate />
        </div>
    );
}

export default SelectedSport;