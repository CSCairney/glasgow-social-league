import { fetchWithAuth } from "@/api/common/fetchWithAuth";
import { useAppSelector } from "@/app/store";
import { MatchRequestDTO, MatchResponseDTO} from "@/types/sports/match";
import {SessionParticipant} from "@/types/sessions";
import {MatchQueryParams} from "@/types/matches";
import {useState} from "react";

export const useMatches = () => {
    const [loading, setLoading] = useState(false);
    const stateToken = useAppSelector(state => state.account.token);

    const getAllMatches = async (params: MatchQueryParams = {}): Promise<MatchResponseDTO[]> => {
        setLoading(true);
        const query = new URLSearchParams();

        if (params.amount !== undefined) {
            query.append('amount', params.amount.toString());
        }
        if (params.sportId !== undefined) {
            query.append('sportId', params.sportId.toString());
        }
        const url = `/matches?${query.toString()}`;

        try {
            const response = await fetchWithAuth(url, {}, stateToken);
            setLoading(false);
            return response as MatchResponseDTO[];
        } catch (error) {
            console.error('Error fetching matches:', error);
            setLoading(false);
            throw error;
        }
    };


    const getMatchesBySessionId = async (sessionId: number): Promise<MatchResponseDTO[]> => {
        return await fetchWithAuth(`/matches/session/${sessionId}`, {}, stateToken);
    };

    const createMatch = async (matchData: MatchRequestDTO): Promise<MatchResponseDTO> => {
        return await fetchWithAuth('/matches', {
            method: 'POST',
            body: JSON.stringify(matchData),
        }, stateToken);
    };

    const updateMatch = async (matchData: MatchRequestDTO): Promise<MatchResponseDTO> => {
        return await fetchWithAuth(`/matches`, {
            method: 'PUT',
            body: JSON.stringify(matchData),
        }, stateToken);
    };

    const createMatchesForSession = async (sessionId: number, participants: SessionParticipant[]): Promise<void> => {
        const participantPairs = [];

        for (let i = 0; i < participants.length; i++) {
            for (let j = i + 1; j < participants.length; j++) {
                participantPairs.push([participants[i], participants[j]]);
            }
        }

        await Promise.all(
            participantPairs.map(async ([playerOne, playerTwo]) => {
                await createMatch({
                    sessionId,
                    playerOneId: playerOne.accountId,
                    playerTwoId: playerTwo.accountId,
                    seasonId: 6,
                    createdById: playerOne.accountId,
                    lastUpdatedById: playerOne.accountId,
                    scorePlayerOne: 0, // Initial score
                    scorePlayerTwo: 0, // Initial score
                    winnerId: undefined, // No winner initially
                    details: '', // Details can be added later
                });
            })
        );
    };

    return {
        getAllMatches,
        getMatchesBySessionId,
        createMatch,
        updateMatch,
        createMatchesForSession,
        loading,
    };
};
