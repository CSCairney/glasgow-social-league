import { fetchWithAuth } from "@/api/common/fetchWithAuth";
import { useAppSelector } from "@/app/store";
import {Session, SessionRequest} from "@/types/sessions";

export const useSessions = () => {
    const stateToken = useAppSelector(state => state.account.token);

    const getAllSessions = async (): Promise<Session[]> => {
        return await fetchWithAuth('/sessions', {}, stateToken);
    };

    const getSessionById = async (id: number): Promise<Session | null> => {
        return await fetchWithAuth(`/sessions/${id}`, {}, stateToken);
    };

    const createSession = async (sessionData: Omit<SessionRequest, 'id'>): Promise<Session> => {
        return await fetchWithAuth('/sessions', {
            method: 'POST',
            body: JSON.stringify(sessionData),
        }, stateToken);
    };

    const updateSession = async (id: number, sessionData: Partial<SessionRequest>): Promise<Session> => {
        return await fetchWithAuth(`/sessions/${id}`, {
            method: 'PUT',
            body: JSON.stringify(sessionData),
        }, stateToken);
    };

    const deleteSession = async (id: number): Promise<void> => {
        return await fetchWithAuth(`/sessions/${id}`, {
            method: 'DELETE',
        }, stateToken);
    };

    return {
        getAllSessions,
        getSessionById,
        createSession,
        updateSession,
        deleteSession,
    };
};
