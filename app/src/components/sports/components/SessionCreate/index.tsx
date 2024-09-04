import React from 'react';
import styles from './styles.module.scss';
import { useSessions } from "@/api/sessions/useSession";
import { RootState, useAppSelector, useAppDispatch } from "@/app/store";
import {SessionRequest} from "@/types/sessions";
import {clearSessionState, setSessionId} from "@/redux/stores/session";

const SessionCreate: React.FC<{ onCreate: (sessionId: number) => void }> = ({ onCreate }) => {
    const { createSession } = useSessions();
    const sportId = useAppSelector((state: RootState) => state.sport.id);
    const accountId = useAppSelector((state: RootState) => state.account.id);
    const dispatch = useAppDispatch();

    const handleCreateSession = async () => {
        try {
            // Clear previous session state before creating a new session
            dispatch(clearSessionState());

            const newSession: Omit<SessionRequest, 'id'> = {
                sportId: sportId!,
                date: new Date().toISOString(),
                createdBy: accountId!.toString(),
                lastUpdatedBy: accountId!.toString(),
                seasonId: 6,
            };

            const createdSession = await createSession(newSession);
            dispatch(setSessionId(createdSession.id));
            onCreate(createdSession.id);
        } catch (error) {
            console.error('Error creating session:', error);
        }
    };

    return (
        <button className={styles.sessionCreateButton} onClick={handleCreateSession}>
            Create New Session
        </button>
    );
};

export default SessionCreate;
