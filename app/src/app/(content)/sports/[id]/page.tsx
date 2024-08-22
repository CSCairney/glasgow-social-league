"use client";
import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { useAppSelector } from "@/app/store";
import { useAccounts } from "@/api/accounts/useAccounts"; // Assuming you have a hook to fetch accounts
import SessionCreate from "../../../../components/sports/components/SessionCreate";
import MatchList from "../../../../components/sports/components/MatchList";
import AccountsModal from "@/components/account/AccountModal";

const SelectedSport = () => {
    const selectedSport = useAppSelector(state => state.sport.name);
    const [sessionId, setSessionId] = useState<number | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [accounts, setAccounts] = useState<any[]>([]); // Add state for accounts

    const { getAllAccounts } = useAccounts();

    useEffect(() => {
        // Fetch accounts when the component mounts
        const fetchAccounts = async () => {
            try {
                const accountsData = await getAllAccounts();
                setAccounts(accountsData);
            } catch (error) {
                console.error("Error fetching accounts:", error);
            }
        };

        fetchAccounts();
    }, []);

    const handleSessionCreated = (newSessionId: number) => {
        setSessionId(newSessionId);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    return (
        <div className={styles.container}>
            <h4 className={styles.title}>{selectedSport}</h4>
            <SessionCreate onCreate={handleSessionCreated} />
            {showModal && sessionId && (
                <AccountsModal
                    sessionId={sessionId}
                    accounts={accounts} // Pass the accounts to the modal
                    onClose={handleModalClose}
                />
            )}
            {sessionId && (
                <MatchList sessionId={sessionId} />
            )}
        </div>
    );
};

export default SelectedSport;
