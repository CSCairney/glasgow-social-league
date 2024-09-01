import {MatchResponseDTO} from "@/types/sports/match";
import {SessionParticipantWithAccount} from "@/api/sessions/useSessionParticipants";

export type useMatchControlsProps = {
    match: MatchResponseDTO;
    participants: SessionParticipantWithAccount[];
}

export const useMatchControls = ({ match, participants }: useMatchControlsProps) => {
    const firstPlayerAccountId = participants.find(p => p.account.id === match.playerOneId)?.account.name;
    const secondPlayerAccountId = participants.find(p => p.account.id === match.playerTwoId)?.account.name
    const matchWinner = participants.find(p => p.account.id === match.winnerId)?.account.name;
    return {
        playerOneName: firstPlayerAccountId,
        playerTwoName: secondPlayerAccountId,
        matchWinner: matchWinner,
    }
}