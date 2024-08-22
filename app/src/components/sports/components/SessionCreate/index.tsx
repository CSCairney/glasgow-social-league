import React, { useState } from 'react';
import styles from './styles.module.scss';
import { useSessions } from "@/api/sessions/useSession";
import { useAccounts } from "@/api/accounts/useAccounts";
import { RootState, useAppSelector } from "@/app/store";
import { SessionRequest } from "@/types/sessions";
import {Account} from "@/types/account";
import AccountsModal from "@/components/account/AccountModal";

const SessionCreate: React.FC<{ onCreate: (sessionId: number) => void }> = ({ onCreate }) => {
    const { createSession } = useSessions();
    const { getAllAccounts } = useAccounts();
    const sportId = useAppSelector((state: RootState) => state.sport.id);
    const accountId = useAppSelector((state: RootState) => state.account.id);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sessionId, setSessionId] = useState<number | null>(null);
    const [accounts, setAccounts] = useState<Account[]>([]);

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
            setSessionId(createdSession.id);
            onCreate(createdSession.id);
            openAccountsModal();
        } catch (error) {
            console.error('Error creating session:', error);
        }
    };

    const openAccountsModal = async () => {
        const fetchedAccounts = await getAllAccounts();
        setAccounts(fetchedAccounts);
        setIsModalOpen(true);
    };

    const closeAccountsModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.sessionCreateContainer}>
            <button className={styles.sessionCreateButton} onClick={handleCreateSession}>
                Create New Session
            </button>
            {isModalOpen && sessionId !== null && (
                <AccountsModal
                    sessionId={sessionId}
                    accounts={accounts}
                    onClose={closeAccountsModal}
                />
            )}
        </div>
    );
};

export default SessionCreate;
