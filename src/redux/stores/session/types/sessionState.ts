import {Match, MatchResponseDTO} from "@/types/sports/match";
import {SessionParticipantWithAccount} from "@/api/sessions/useSessionParticipants";
import {Account} from "@/types/account";

export type SessionState = {
    sessionId: number | null;
    participants: SessionParticipantWithAccount[];
    matches: MatchResponseDTO[];
    availableAccounts: Account[];
};
