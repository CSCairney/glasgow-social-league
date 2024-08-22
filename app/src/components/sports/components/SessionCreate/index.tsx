import React, { useState } from 'react';
import styles from './styles.module.scss';
import { useSessions } from "@/api/sessions/useSession";
import { RootState, useAppSelector } from "@/app/store";
import { SessionRequest } from "@/types/sessions";
import { useAccounts } from "@/api/accounts/useAccounts";
import AccountsModal from "@/components/account/AccountModal";

const SessionCreate: React.FC = () => {
    const { createSession } = useSessions();
    const { getAllAccounts } = useAccounts();
    const sportId = useAppSelector((state: RootState) => state.sport.id);
    const accountId = useAppSelector((state: RootState) => state.account.id);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [createdSessionId, setCreatedSessionId] = useState<number | null>(null);
    const [accounts, setAccounts] = useState<any[]>([]);

    const handleCreateSession = async () => {
        try {
            const newSession: Omit<SessionRequest, 'id'> = {
                sportId: sportId!,
                date: new Date().toISOString(),
                createdBy: accountId!.toString(),
                lastUpdatedBy: accountId!.toString(),
                seasonId: 6,
            };

            const createdSession = await createSession(newSession);
            console.log('Session created:', createdSession);
            setCreatedSessionId(createdSession.id);

            const accountsList = await getAllAccounts();
            setAccounts(accountsList);

            setIsModalOpen(true);  // Open the modal
        } catch (error) {
            console.error('Error creating session:', error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCreatedSessionId(null);
    };

    return (
        <>
            <button className={styles.sessionCreateButton} onClick={handleCreateSession}>
                Create New Session
            </button>
            {isModalOpen && createdSessionId && (
                <AccountsModal
                    sessionId={createdSessionId}
                    accounts={accounts}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};

export default SessionCreate;
