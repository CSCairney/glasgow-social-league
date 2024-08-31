import styles from "./styles.module.scss";
import React from "react";
import {MatchResponseDTO} from "@/types/sports/match";
import {SessionParticipantWithAccount} from "@/api/sessions/useSessionParticipants";
import Avatar from "@/components/common/Avatar";
import {useMatchControls} from "@/hooks/sports/match/useMatchControls";
import {MatchFooter} from "@/components/sports/components/Match/components/MatchFooter";

export type MatchProps = {
    match: MatchResponseDTO;
    participants: SessionParticipantWithAccount[];
    handleScoreChange: (matchId: number, newScorePlayerOne: number, newScorePlayerTwo: number) => void;
    localScores: { [key: number]: { scorePlayerOne: number, scorePlayerTwo: number } };
}

export const Match = ({ match, participants, handleScoreChange, localScores }: MatchProps) => {
    const { playerOneName, playerTwoName, matchWinner } = useMatchControls({match, participants});
    return (
        <div className={styles.matchItem}>
            <div className={styles.matchDetails}>
                <div className={styles.matchPlayerContainer}>
                    {<Avatar accountId={match.playerOneId}/> || <h4>{playerOneName}</h4>}
                    <h6>{playerOneName}</h6>
                </div>
                <div className={styles.matchScores}>
                    <input
                        className={styles.inputField}
                        type="number"
                        value={localScores[match.id]?.scorePlayerOne || match.scorePlayerOne}
                        onChange={(e) => handleScoreChange(match.id, Number(e.target.value), localScores[match.id]?.scorePlayerTwo || match.scorePlayerTwo)}
                    />
                    <input
                        className={styles.inputField}
                        type="number"
                        value={localScores[match.id]?.scorePlayerTwo || match.scorePlayerTwo}
                        onChange={(e) => handleScoreChange(match.id, localScores[match.id]?.scorePlayerOne || match.scorePlayerOne, Number(e.target.value))}
                    />
                </div>
                <div className={styles.matchPlayerContainer}>
                    {<Avatar accountId={match.playerTwoId}/> || <h4>{playerTwoName}</h4>}
                    <h6>{playerTwoName}</h6>
                </div>
            </div>
            <MatchFooter match={match} winnerName={matchWinner ? matchWinner : 'TBD'} />
        </div>
    )
}