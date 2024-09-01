"use client";
import React, { useState, useEffect, useCallback } from "react";
import styles from "./styles.module.scss";
import { useAppSelector, useAppDispatch } from "@/app/store";
import { SessionParticipantWithAccount } from "@/api/sessions/useSessionParticipants";
import { useMatches } from "@/api/sports/useMatches";
import { MatchRequestDTO, MatchResponseDTO } from "@/types/sports/match";
import { setMatches as setMatchesInStore } from "@/redux/stores/session";
import debounce from 'lodash/debounce';
import {Match} from "@/components/sports/components/Match";
import Loader from "@/components/common/Loader";

const MatchList: React.FC<{ sessionId: number }> = ({ sessionId }) => {
    const { createMatch, updateMatch, getMatchesBySessionId } = useMatches();
    const storedMatches = useAppSelector(state => state.session.matches);
    const participants = useAppSelector(state => state.session.participants);
    const accountId = useAppSelector(state => state.account.id);
    const [loading, setLoading] = useState(false);
    const [matches, setLocalMatches] = useState<MatchResponseDTO[]>(storedMatches);
    const [localScores, setLocalScores] = useState<{ [key: number]: { scorePlayerOne: number, scorePlayerTwo: number } }>({});
    const dispatch = useAppDispatch()

    useEffect(() => {
        const fetchMatches = async () => {
            if (storedMatches.length > 0) {
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
        setLoading(true);
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
        setLoading(false);
    };

    const debouncedUpdateMatch = useCallback(
        debounce(async (matchId: number, scorePlayerOne: number, scorePlayerTwo: number, winnerId: string) => {
            try {
                const match = matches.find(match => match.id === matchId);
                if (!match) {
                    console.error("Match not found for given ID:", matchId);
                    return;
                }

                const updateMatchRequestDTO: MatchRequestDTO = {
                    createdById: accountId!.toString(),
                    seasonId: 6,
                    sessionId: sessionId,
                    id: matchId,
                    playerOneId: match.playerOneId,
                    playerTwoId: match.playerTwoId,
                    scorePlayerOne,
                    scorePlayerTwo,
                    winnerId,
                };

                await updateMatch(updateMatchRequestDTO);

                const updatedMatches = matches.map(m =>
                    m.id === matchId ? { ...m, scorePlayerOne, scorePlayerTwo, winnerId } : m
                );

                setLocalMatches(updatedMatches);
                dispatch(setMatchesInStore(updatedMatches));
            } catch (error) {
                console.error('Error updating match:', error);
            }
        }, 5000),
        [matches, dispatch, accountId, sessionId, updateMatch]
    );

    const handleScoreChange = (matchId: number, newScorePlayerOne: number, newScorePlayerTwo: number) => {
        setLocalScores(prevScores => ({
            ...prevScores,
            [matchId]: { scorePlayerOne: newScorePlayerOne, scorePlayerTwo: newScorePlayerTwo }
        }));

        const match = matches.find(match => match.id === matchId);
        if (match) {
            const winnerId = newScorePlayerOne > newScorePlayerTwo ? match.playerOneId : match.playerTwoId;
            debouncedUpdateMatch(matchId, newScorePlayerOne, newScorePlayerTwo, winnerId!);
        }
    };

    if (loading) return (
        <div className={styles.loadingContainer}>
            <Loader/>
        </div>
    )

    return (
            <div className={styles.matchListContainer}>
                {matches.map(match => (
                    <Match key={match.id} match={match} participants={participants}
                           handleScoreChange={handleScoreChange} localScores={localScores}/>
                ))}
            </div>
    );
};

export default MatchList;
