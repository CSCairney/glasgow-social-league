"use client";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import { useAppSelector } from "@/app/store";
import SessionCreate from "../../../../components/sports/components/SessionCreate";
import MatchList from "../../../../components/sports/components/MatchList"; // Import the MatchList component
import { useAccounts } from "@/api/accounts/useAccounts";
import AccountsModal from "@/components/account/AccountModal";

const SelectedSport = () => {
    const selectedSport = useAppSelector(state => state.sport.name);
    const { getAllAccounts } = useAccounts();
    const [sessionId, setSessionId] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [accounts, setAccounts] = useState<any[]>([]);

    const handleSessionCreated = async (newSessionId: number) => {
        setSessionId(newSessionId);

        const accountList = await getAllAccounts();
        setAccounts(accountList);

        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className={styles.container}>
            <h4 className={styles.title}>{selectedSport}</h4>
            <SessionCreate onCreate={handleSessionCreated}/>
            {showModal && (
                <AccountsModal
                    sessionId={sessionId!}
                    accounts={accounts}
                    onClose={handleCloseModal}
                />
            )}
            {sessionId && (
                <MatchList sessionId={sessionId}/> // Render MatchList when a session is created
            )}
        </div>
    );
};

export default SelectedSport;
