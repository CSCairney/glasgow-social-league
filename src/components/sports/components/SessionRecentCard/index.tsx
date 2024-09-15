"use client";
import { useEffect, useState } from "react";
import { Session } from "@/types/sessions";
import styles from "./styles.module.scss";
import Avatar from "@/components/common/Avatar";
import { formatDateString } from "@/helpers/dates";
import { Account } from "@/types/account";
import { retrieveAccountName } from "@/helpers/accounts";
import { sportsLookup } from "@/helpers/sports/sports";
import { useAppDispatch } from "@/app/store";
import { setSessionId } from "@/redux/stores/session";

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
    };

    return (
        <div className={styles.cardContainer} onClick={() => handleSelectSession(session.id)}>
            <div className={styles.cardContent}>
                <div className={styles.details}>
                    <h2 className={styles.title}>Session {session.id}</h2>
                    <table className={styles.informationTable}>
                        <tbody>
                        <tr>
                            <td><i className="fas fa-calendar-alt"/> Date:</td>
                            <td>{formatDateString(session.date)}</td>
                        </tr>
                        <tr>
                            <td><i className="fas fa-user"/> Creator:</td>
                            <td>{createdByName}</td>
                        </tr>
                        <tr>
                            <td><i className="fas fa-edit"/> Updated:</td>
                            <td>{updatedByName}</td>
                        </tr>
                        <tr>
                            <td><i className="fas fa-futbol"/> Sport:</td>
                            <td>{sportsLookup[session.sportId]}</td>
                        </tr>
                        </tbody>
                    </table>
                    {session.participants && session.participants.length > 0 && (
                        <div className={styles.participants}>
                            <strong>Participants</strong>
                            <div className={styles.participantAvatars}>
                                {session.participants.map((participant, index) => (
                                    <Avatar key={index} accountId={participant.accountId} size={50}/>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.avatarContainer}>
                    <Avatar accountId={session.createdBy} size={60}/>
                </div>
            </div>
        </div>
    );
};
