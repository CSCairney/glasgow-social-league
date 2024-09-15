import { fetchWithAuth } from "@/api/common/fetchWithAuth";
import { useAppSelector } from "@/app/store";
import { SessionParticipant } from "@/types/sessions";
import { Account } from "@/types/account";  // Assuming Account is imported here

export type SessionParticipantWithAccount = SessionParticipant & { account: Account };

export const useSessionParticipants = () => {
    const stateToken = useAppSelector(state => state.account.token);

    const getParticipantsBySessionId = async (sessionId: number): Promise<SessionParticipantWithAccount[]> => {
        const participants = await fetchWithAuth(`/session-participants/session/${sessionId}`, {}, stateToken);
        return await Promise.all(
            participants.map(async (participant: SessionParticipant): Promise<SessionParticipantWithAccount> => {
                const account = await fetchWithAuth(`/accounts/${participant.accountId}`, {}, stateToken);
                return { ...participant, account };
            })
        );
    };

    const getSessionsByAccountId = async (accountId: string): Promise<SessionParticipantWithAccount[]> => {
        const participants = await fetchWithAuth(`/session-participants/account/${accountId}`, {}, stateToken);
        return await Promise.all(
            participants.map(async (participant: SessionParticipant): Promise<SessionParticipantWithAccount> => {
                const account = await fetchWithAuth(`/accounts/${participant.accountId}`, {}, stateToken);
                return { ...participant, account };
            })
        );
    };

    const addParticipantToSession = async (sessionParticipantData: SessionParticipant): Promise<SessionParticipantWithAccount> => {
        const participant = await fetchWithAuth('/session-participants', {
            method: 'POST',
            body: JSON.stringify(sessionParticipantData),
        }, stateToken);
        const account = await fetchWithAuth(`/accounts/${participant.accountId}`, {}, stateToken);
        return { ...participant, account };
    };

    const removeParticipantFromSession = async (sessionParticipantData: SessionParticipant): Promise<void> => {
        await fetchWithAuth('/session-participants', {
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
