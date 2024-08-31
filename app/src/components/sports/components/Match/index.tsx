import styles from "@/components/sports/components/MatchList/styles.module.scss";
import React from "react";
import {MatchResponseDTO} from "@/types/sports/match";
import {SessionParticipantWithAccount} from "@/api/sessions/useSessionParticipants";

export type MatchProps = {
    match: MatchResponseDTO;
    participants: SessionParticipantWithAccount[];
    handleScoreChange: (matchId: number, newScorePlayerOne: number, newScorePlayerTwo: number) => void;
    localScores: { [key: number]: { scorePlayerOne: number, scorePlayerTwo: number } };
}

export const Match = ({ match, participants, handleScoreChange, localScores }: MatchProps) => {
    return (
        <div className={styles.matchItem}>
            <div className={styles.matchDetails}>
                <h4>
                    {participants.find(p => p.account.id === match.playerOneId)?.account.name} vs {participants.find(p => p.account.id === match.playerTwoId)?.account.name}
                </h4>
            </div>
            <div className={styles.matchScores}>
                <input
                    type="number"
                    value={localScores[match.id]?.scorePlayerOne || match.scorePlayerOne}
                    onChange={(e) => handleScoreChange(match.id, Number(e.target.value), localScores[match.id]?.scorePlayerTwo || match.scorePlayerTwo)}
                />
                <input
                    type="number"
                    value={localScores[match.id]?.scorePlayerTwo || match.scorePlayerTwo}
                    onChange={(e) => handleScoreChange(match.id, localScores[match.id]?.scorePlayerOne || match.scorePlayerOne, Number(e.target.value))}
                />
            </div>
            <div className={styles.matchWinner}>
                Winner: {match.winnerId ? participants.find(p => p.account.id === match.winnerId)?.account.name : 'TBD'}
            </div>
        </div>
    )
}