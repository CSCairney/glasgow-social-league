import {Match} from "@/types/sports/match";
import {SessionParticipantWithAccount} from "@/api/sessions/useSessionParticipants";

export type SessionState = {
    sessionId: number | null;
    participants: SessionParticipantWithAccount[];
    matches: Match[];
};
