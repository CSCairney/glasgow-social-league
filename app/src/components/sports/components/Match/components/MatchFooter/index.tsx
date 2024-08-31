import styles from "./styles.module.scss";
import React from "react";
import {MatchResponseDTO} from "@/types/sports/match";

export type MatchFooterProps = {
    match: MatchResponseDTO;
    winnerName: string;
}


export const MatchFooter = ({ match, winnerName }: MatchFooterProps) => {
    return (
        <div className={styles.matchFooterContainer}>
            Winner: {winnerName}
        </div>
    )
}