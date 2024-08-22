import React, { useState } from 'react';
import styles from './styles.module.scss';
import {useSessionParticipants} from "@/api/sessions/useSessionParticipants";

interface AccountsModalProps {
    sessionId: number;
    accounts: any[];
    onClose: () => void;
}

const AccountsModal: React.FC<AccountsModalProps> = ({ sessionId, accounts, onClose }) => {
    const { addParticipantToSession } = useSessionParticipants();
    const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);

    const handleAccountSelection = (accountId: string) => {
        setSelectedAccounts(prevSelected =>
            prevSelected.includes(accountId)
                ? prevSelected.filter(id => id !== accountId)
                : [...prevSelected, accountId]
        );
    };

    const handleStartSession = async () => {
        try {
            await Promise.all(
                selectedAccounts.map(accountId =>
                    addParticipantToSession({ sessionId, accountId })
                )
            );
            console.log('Session started with participants:', selectedAccounts);
            onClose();
        } catch (error) {
            console.error('Error starting session:', error);
        }
    };


    return (
        <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
            <h2>Select Participants</h2>
    <div className={styles.accountList}>
        {accounts.map(account => (
                <div key={account.id} className={styles.accountItem}>
            <label>
                <input
                    type="checkbox"
            value={account.id}
            onChange={() => handleAccountSelection(account.id)}
    />
    {account.name}
    </label>
    </div>
))}
    </div>
    <button onClick={handleStartSession} className={styles.startButton}>Start Session</button>
    <button onClick={onClose} className={styles.closeButton}>Close</button>
        </div>
        </div>
);
};

export default AccountsModal;
