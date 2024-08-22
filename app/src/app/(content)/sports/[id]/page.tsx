"use client";
import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { useAppSelector } from "@/app/store";
import { useAccounts } from "@/api/accounts/useAccounts";
import SessionCreate from "../../../../components/sports/components/SessionCreate";
import MatchList from "../../../../components/sports/components/MatchList";
import AccountsModal from "@/components/account/AccountModal";
import SessionStop from "@/components/sports/components/SessionStop";

const SelectedSport = () => {
    const selectedSport = useAppSelector(state => state.sport.name);
    const storedSessionId = useAppSelector(state => state.session.sessionId);
    const [sessionId, setSessionId] = useState<number | null>(storedSessionId);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [accounts, setAccounts] = useState<any[]>([]);

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

    useEffect(() => {
        if (storedSessionId) {
            setSessionId(storedSessionId);
        }
    }, [storedSessionId]);

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
            {!sessionId && <SessionCreate onCreate={handleSessionCreated} />}
            {sessionId && <SessionStop />}
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
