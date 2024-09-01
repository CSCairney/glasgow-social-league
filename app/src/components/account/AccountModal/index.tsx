import React, { useState } from 'react';
import styles from './styles.module.scss';
import { useSessionParticipants } from "@/api/sessions/useSessionParticipants";
import { useAppDispatch } from "@/app/store";
import { setParticipants } from "@/redux/stores/session";

interface AccountsModalProps {
    sessionId: number;
    accounts: any[];
    onClose: () => void;
    onCloseWithSession: () => void;
}

const AccountsModal: React.FC<AccountsModalProps> = ({ sessionId, accounts, onClose, onCloseWithSession }) => {
    const { addParticipantToSession } = useSessionParticipants();
    const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
    const dispatch = useAppDispatch();

    const handleAccountSelection = (accountId: string) => {
        setSelectedAccounts(prevSelected =>
            prevSelected.includes(accountId)
                ? prevSelected.filter(id => id !== accountId)
                : [...prevSelected, accountId]
        );
    };

    const handleStartSession = async () => {
        try {
            const participants = await Promise.all(
                selectedAccounts.map(accountId =>
                    addParticipantToSession({ sessionId, accountId })
                )
            );
            console.log('Session started with participants:', selectedAccounts);
            dispatch(setParticipants(participants));
            onCloseWithSession();
        } catch (error) {
            console.error('Error starting session:', error);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2 className={styles.title}>Select Participants</h2>
                <div className={styles.accountList}>
                    {accounts.map(account => (
                        <button
                            key={account.id}
                            className={`${styles.accountItem} ${selectedAccounts.includes(account.id) ? styles.selected : ''}`}
                            onClick={() => handleAccountSelection(account.id)}
                        >
                            {account.name}
                        </button>
                    ))}
                </div>
                <div className={styles.modalActions}>
                    <button onClick={handleStartSession} className={styles.startButton}>Start Session</button>
                    <button onClick={onClose} className={styles.closeButton}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default AccountsModal;
