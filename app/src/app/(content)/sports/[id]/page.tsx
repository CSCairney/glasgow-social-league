"use client";
import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import {RootState, useAppDispatch, useAppSelector} from "@/app/store";
import { MdRefresh } from "react-icons/md";
import { useAccounts } from "@/api/accounts/useAccounts";
import SessionCreate from "../../../../components/sports/components/SessionCreate";
import MatchList from "../../../../components/sports/components/MatchList";
import AccountsModal from "@/components/account/AccountModal";
import SessionStop from "@/components/sports/components/SessionStop";
import {Account} from "@/types/account";
import { toast } from "react-toastify";
import {SessionRecent} from "@/components/sports/components/SessionRecent";
import {setAvailableAccounts, setSessionId as setReduxSessionId } from "@/redux/stores/session";
import {headerImageRouteHandler} from "@/helpers/sports/headers";
import {PageHeader} from "@/components/common/PageHeader";
import {Icon} from "@/components/common/Icon";

const SelectedSport = () => {
    const selectedSport = useAppSelector((state: RootState) => state.sport.name);
    const selectedSportHeaderImage = headerImageRouteHandler(selectedSport);
    const storedSessionId = useAppSelector((state: RootState) => state.session.sessionId);
    const [loading, setLoading] = useState(true);
    const [sessionId, setSessionId] = useState<number | null>(storedSessionId);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const dispatch = useAppDispatch();

    const { getAllAccounts } = useAccounts();

    useEffect(() => {
        const fetchAccounts = async () => {
            setLoading(true);
            try {
                const accountsData = await getAllAccounts();
                setAccounts(accountsData);
                dispatch(setAvailableAccounts(accountsData));
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

    const handleModalCloseWithSession = () => {
        setShowModal(false);
        toast.info("Session Created!")
    };

    const handleRefreshToken = () => {
        dispatch(setReduxSessionId(null))
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!sessionId) return (
        <div className={styles.container}>
            <div className={styles.header}>
                {selectedSportHeaderImage ?
                    <PageHeader
                        alt={`${selectedSport} header`}
                        image={selectedSportHeaderImage}
                        height={"Medium"}
                        // overlayText={selectedSport}
                    /> :
                    <h4>{selectedSport}</h4>}
            </div>
            <div className={styles.controllers}>
                <SessionCreate onCreate={handleSessionCreated}/>
                <Icon type={MdRefresh} onClick={handleRefreshToken} className={styles.refresh} />
            </div>
            <SessionRecent type={"card"}/>
        </div>
    );

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {selectedSportHeaderImage ?
                    <PageHeader
                        alt={`${selectedSport} header`}
                        image={selectedSportHeaderImage}
                        height={"Medium"}
                        overlayText={selectedSport}
                    /> :
                    <h4>{selectedSport}</h4>}
            </div>
            {sessionId && <SessionStop />}
            {showModal && sessionId && (
                <AccountsModal
                    sessionId={sessionId}
                    accounts={accounts}
                    onClose={handleModalClose}
                    onCloseWithSession={handleModalCloseWithSession}
                />
            )}
            {sessionId && (
                <MatchList sessionId={sessionId}/>
            )}
        </div>
    );
};

export default SelectedSport;
