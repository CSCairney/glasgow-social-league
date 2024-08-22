"use client";
import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { useAppSelector, useAppDispatch } from "@/app/store";
import { SessionParticipantWithAccount } from "@/api/sessions/useSessionParticipants";
import { useMatches } from "@/api/sports/useMatches";
import { MatchRequestDTO, MatchResponseDTO} from "@/types/sports/match";
import { setMatches as setMatchesInStore } from "@/redux/stores/session";

const MatchList: React.FC<{ sessionId: number }> = ({ sessionId }) => {
    const { createMatch, updateMatch, getMatchesBySessionId } = useMatches();
    const storedMatches = useAppSelector(state => state.session.matches);
    const participants = useAppSelector(state => state.session.participants);
    const accountId = useAppSelector(state => state.account.id);
    const [matches, setLocalMatches] = useState<MatchResponseDTO[]>(storedMatches || []);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchMatches = async () => {
            if (storedMatches.length > 0) {
                // Use matches from state if available
                setLocalMatches(storedMatches);
            } else {
                const matchesData = await getMatchesBySessionId(sessionId);
                if (matchesData.length > 0) {
                    setLocalMatches(matchesData);
                    dispatch(setMatchesInStore(matchesData));
                } else if (participants.length > 1) {
                    await generateMatches(participants);
                }
            }
        };

        fetchMatches();
    }, [sessionId, participants, storedMatches]);

    const generateMatches = async (participantsList: SessionParticipantWithAccount[]) => {
        const newMatches: MatchResponseDTO[] = [];
        for (let i = 0; i < participantsList.length; i++) {
            for (let j = i + 1; j < participantsList.length; j++) {
                const newMatch: MatchRequestDTO = {
                    playerOneId: participantsList[i].account.id,
                    playerTwoId: participantsList[j].account.id,
                    scorePlayerOne: 0,
                    scorePlayerTwo: 0,
                    winnerId: undefined,
                    sessionId: sessionId,
                    seasonId: 6,
                    createdById: participantsList[i].account.id,
                    lastUpdatedById: participantsList[i].account.id,
                    details: "",
                };
                const createdMatch = await createMatch(newMatch);
                newMatches.push(createdMatch);
            }
        }
        setLocalMatches(newMatches);
        dispatch(setMatchesInStore(newMatches));
    };

    const handleScoreUpdate = async (matchId: number, scorePlayerOne: number, scorePlayerTwo: number) => {
        if (!matchId) {
            console.error("Match ID is null or undefined");
            return;
        }

        const match = matches.find(match => match.id === matchId);
        if (!match) {
            console.error("Match not found for given ID:", matchId);
            return;
        }

        const winnerId = scorePlayerOne > scorePlayerTwo ? match.playerOneId : match.playerTwoId;
        const playerOneId = match.playerOneId;
        const playerTwoId = match.playerTwoId;

        try {
            const updateMatchRequestDTO: MatchRequestDTO = {
                createdById: accountId!.toString(),
                seasonId: 6,
                sessionId: sessionId,
                id: matchId,
                playerOneId,
                playerTwoId,
                scorePlayerOne,
                scorePlayerTwo,
                winnerId
            }


            await updateMatch(updateMatchRequestDTO);
            const updatedMatches = matches.map(m =>
                m.id === matchId ? { ...m, scorePlayerOne, scorePlayerTwo, winnerId } : m
            );
            setLocalMatches(updatedMatches);
            dispatch(setMatchesInStore(updatedMatches));
        } catch (error) {
            console.error('Error updating match:', error);
        }
    };



    return (
        <div className={styles.matchListContainer}>
            {matches.map(match => (
                <div key={match.id} className={styles.matchItem}>
                    <div className={styles.matchDetails}>
                        <span>
                            {participants.find(p => p.account.id === match.playerOneId)?.account.name} vs {participants.find(p => p.account.id === match.playerTwoId)?.account.name}
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
