"use client";
import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import {RootState, useAppSelector} from "@/app/store";
import { useAccounts } from "@/api/accounts/useAccounts";
import SessionCreate from "../../../../components/sports/components/SessionCreate";
import MatchList from "../../../../components/sports/components/MatchList";
import AccountsModal from "@/components/account/AccountModal";
import SessionStop from "@/components/sports/components/SessionStop";
import {Account} from "@/types/account";

const SelectedSport = () => {
    const selectedSport = useAppSelector((state: RootState) => state.sport.name);
    const storedSessionId = useAppSelector((state: RootState) => state.session.sessionId);
    const [loading, setLoading] = useState(true);
    const [sessionId, setSessionId] = useState<number | null>(storedSessionId);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [accounts, setAccounts] = useState<Account[]>([]);

    const { getAllAccounts } = useAccounts();

    useEffect(() => {
        const fetchAccounts = async () => {
            setLoading(true);
            try {
                const accountsData = await getAllAccounts();
                setAccounts(accountsData);
            } catch (error) {
                console.error("Error fetching accounts:", error);
            }
            setLoading(false);
        };

        fetchAccounts();
    }, []);

    useEffect(() => {
        setLoading(true);
        if (storedSessionId) {
            setSessionId(storedSessionId);
        }
        setLoading(false);
    }, [storedSessionId]);

    const handleSessionCreated = (newSessionId: number) => {
        setSessionId(newSessionId);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!sessionId) return (
        <div className={styles.container}>
            <h4 className={styles.title}>{selectedSport}</h4>
            <SessionCreate onCreate={handleSessionCreated}/>
        </div>
    );

    return (
        <div className={styles.container}>
            <h4 className={styles.title}>{selectedSport}</h4>
            {sessionId && <SessionStop/>}
            {showModal && sessionId && (
                <AccountsModal
                    sessionId={sessionId}
                    accounts={accounts}
                    onClose={handleModalClose}
                />
            )}
            {sessionId && (
                <MatchList sessionId={sessionId}/>
            )}
        </div>
    );
};

export default SelectedSport;
