"use client";
import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { useSessionParticipants, SessionParticipantWithAccount } from "@/api/sessions/useSessionParticipants";
import { useMatches } from "@/api/sports/useMatches";
import { Match } from "@/types/sports/match";

const MatchList: React.FC<{ sessionId: number }> = ({ sessionId }) => {
    const { getParticipantsBySessionId } = useSessionParticipants();
    const { createMatch, updateMatch, getMatchesBySessionId } = useMatches();
    const [matches, setMatches] = useState<Match[]>([]);
    const [participants, setParticipants] = useState<SessionParticipantWithAccount[]>([]);

    useEffect(() => {
        const fetchParticipants = async () => {
            const participantsData = await getParticipantsBySessionId(sessionId);
            setParticipants(participantsData);
            return participantsData;
        };

        const fetchMatches = async (participantsList: SessionParticipantWithAccount[]) => {
            const matchesData = await getMatchesBySessionId(sessionId);
            if (matchesData.length > 0) {
                setMatches(matchesData);
            } else if (participantsList.length > 1) {
                await generateMatches(participantsList);
            }
        };

        fetchParticipants().then(fetchMatches);
    }, [sessionId]);

    const generateMatches = async (participantsList: SessionParticipantWithAccount[]) => {
        const newMatches: Match[] = [];
        for (let i = 0; i < participantsList.length; i++) {
            for (let j = i + 1; j < participantsList.length; j++) {
                const newMatch: Omit<Match, 'id'> = {
                    playerOneId: participantsList[i].account.id,
                    playerTwoId: participantsList[j].account.id,
                    scorePlayerOne: 0,
                    scorePlayerTwo: 0,
                    winnerId: null,
                    sessionId: sessionId,
                    seasonId: 6, // Replace with the correct season ID
                    createdById: participantsList[i].account.id,
                    lastUpdatedById: participantsList[i].account.id,
                    details: "",
                };
                const createdMatch = await createMatch(newMatch);
                newMatches.push(createdMatch);
            }
        }
        setMatches(newMatches);
    };

    const handleScoreUpdate = async (matchId: number, scorePlayerOne: number, scorePlayerTwo: number) => {
        const match = matches.find(match => match.id === matchId);
        const winnerId = scorePlayerOne > scorePlayerTwo ? match?.playerOneId : match?.playerTwoId;
        if (match) {
            await updateMatch(matchId, { scorePlayerOne, scorePlayerTwo, winnerId });
            // @ts-ignore
            setMatches(matches.map(m => m.id === matchId ? { ...m, scorePlayerOne, scorePlayerTwo, winnerId } : m));
        }
    };

    if (!matches || sessionId) {
        return (
            <></>
        )
    }

    return (
        <div className={styles.matchListContainer}>
            {matches.map(match => (
                <div key={match.id} className={styles.matchItem}>
                    <div className={styles.matchDetails}>
                        <span>
                            {participants.find(p => p.account.id === match.playerOneId)?.account.name} vs
                            {participants.find(p => p.account.id === match.playerTwoId)?.account.name}
                        </span>
                    </div>
                    <div className={styles.matchScores}>
                        <input
                            type="number"
                            value={match.scorePlayerOne}
                            onChange={(e) => handleScoreUpdate(match.id, Number(e.target.value), match.scorePlayerTwo)}
                        />
                        <input
                            type="number"
                            value={match.scorePlayerTwo}
                            onChange={(e) => handleScoreUpdate(match.id, match.scorePlayerOne, Number(e.target.value))}
                        />
                    </div>
                    <div className={styles.matchWinner}>
                        Winner: {match.winnerId ? participants.find(p => p.account.id === match.winnerId)?.account.name : 'TBD'}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MatchList;
