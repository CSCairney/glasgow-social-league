"use client";
import { useEffect, useState } from "react";
import { Session } from "@/types/sessions";
import styles from "./styles.module.scss";
import Avatar from "@/components/common/Avatar";
import { formatDateString } from "@/helpers/dates";
import { Account } from "@/types/account";
import { retrieveAccountName } from "@/helpers/accounts";
import {useAppDispatch} from "@/app/store";
import {setSessionId} from "@/redux/stores/session";

export type SessionRecentCardProps = {
    session: Session;
    availableAccounts: Account[];
};
export const SessionRecentCard = ({ session, availableAccounts }: SessionRecentCardProps) => {
    const [createdByName, setCreatedByName] = useState<string>("");
    const [updatedByName, setUpdatedByName] = useState<string>("");
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchNames = async () => {
            const createdName = await retrieveAccountName(session.createdBy, availableAccounts);
            const updatedName = await retrieveAccountName(session.lastUpdatedBy, availableAccounts);
            if (createdName) {
                setCreatedByName(createdName);
            }
            if (updatedName) {
                setUpdatedByName(updatedName);
            }
        };

        fetchNames();
    }, [session.createdBy, session.lastUpdatedBy, availableAccounts]);

    const handleSelectSession = (sessionId: number) => {
        dispatch(setSessionId(sessionId));
    }

    return (
        <div className={styles.container} onClick={() => handleSelectSession(session.id)}>
            <div className={styles.details}>
                <h2 className={styles.title}>Session: {session.id}</h2>
                <div className={styles.information}>
                    <ul className={styles.informationList}>
                        <li>
                            <strong>Date: </strong>
                            {formatDateString(session.date)}
                        </li>
                        <li>
                            <strong>Created By: </strong>
                            {createdByName}
                        </li>
                        <li>
                            <strong>Updated By: </strong>
                            {updatedByName}
                        </li>
                        <li>
                            <strong>Sport: </strong>
                            {session.sportId}
                        </li>
                    </ul>
                </div>
                <div className={styles.participants}>
                    {session.participants && session.participants?.length > 0 && (
                        <>
                            <strong>Participants: </strong>
                            <div className={styles.participantAvatars}>
                                {session.participants.map((participant, index) => (
                                    <Avatar key={index} accountId={participant.accountId} size={40} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className={styles.avatar}>
                <Avatar accountId={session.createdBy} />
            </div>
        </div>
    );
};

