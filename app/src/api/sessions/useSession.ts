import { fetchWithAuth } from "@/api/common/fetchWithAuth";
import { useAppSelector } from "@/app/store";
import {Session, SessionRequest, SessionQueryParams } from "@/types/sessions";
import {Page} from "@/types/pagination";

export const useSessions = () => {
    const stateToken = useAppSelector(state => state.account.token);

    // @ts-ignore
    const getAllSessions = async (params: SessionQueryParams = {}): Promise<Page<Session>> => {
        const query = new URLSearchParams();

        if (params.page !== undefined) {
            query.append('page', params.page.toString());
        }

        if (params.size !== undefined) {
            query.append('size', params.size.toString());
        }

        if (params.sportId !== undefined) {
            query.append('sportId', params.sportId.toString());
        }

        if (params.includeParticipants !== undefined) {
            query.append('includeParticipants', params.includeParticipants.toString());
        }

        const url = `/sessions?${query.toString()}`;

        try {
            const response = await fetchWithAuth(url, {}, stateToken);
            return response as Page<Session>;
        } catch (error) {
            console.error('Error fetching sessions:', error);
            throw error;
        }
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
