import { fetchWithAuth } from "@/api/common/fetchWithAuth";
import { useAppSelector } from "@/app/store";
import { SessionParticipant } from "@/types/sessions";

export const useSessionParticipants = () => {
    const stateToken = useAppSelector(state => state.account.token);

    const getParticipantsBySessionId = async (sessionId: number): Promise<SessionParticipant[]> => {
        return await fetchWithAuth(`/session-participants/session/${sessionId}`, {}, stateToken);
    };

    const getSessionsByAccountId = async (accountId: string): Promise<SessionParticipant[]> => {
        return await fetchWithAuth(`/session-participants/account/${accountId}`, {}, stateToken);
    };

    const addParticipantToSession = async (sessionParticipantData: SessionParticipant): Promise<SessionParticipant> => {
        return await fetchWithAuth('/session-participants', {
            method: 'POST',
            body: JSON.stringify(sessionParticipantData),
        }, stateToken);
    };

    const removeParticipantFromSession = async (sessionParticipantData: SessionParticipant): Promise<void> => {
        return await fetchWithAuth('/session-participants', {
            method: 'DELETE',
            body: JSON.stringify(sessionParticipantData),
        }, stateToken);
    };

    return {
        getParticipantsBySessionId,
        getSessionsByAccountId,
        addParticipantToSession,
        removeParticipantFromSession,
    };
};
