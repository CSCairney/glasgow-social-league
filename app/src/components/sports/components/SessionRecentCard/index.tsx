"use client";
import { useEffect, useState } from "react";
import { Session } from "@/types/sessions";
import styles from "./styles.module.scss";
import Avatar from "@/components/common/Avatar";
import { formatDateString } from "@/helpers/dates";
import { Account } from "@/types/account";
import { retrieveAccountName } from "@/helpers/accounts";
import {useSessionParticipants} from "@/api/sessions/useSessionParticipants";
import Loader from "@/components/common/Loader";

export type SessionRecentCardProps = {
    session: Session;
    availableAccounts: Account[];
};

export const SessionRecentCard = ({ session, availableAccounts }: SessionRecentCardProps) => {
    const [loading, setLoading] = useState(false);
    const { getParticipantsBySessionId } = useSessionParticipants()
    const [createdByName, setCreatedByName] = useState<string>("");
    const [updatedByName, setUpdatedByName] = useState<string>("");
    const [participants, setParticipants] = useState<Account[]>([]);

    useEffect(() => {
        const fetchNamesAndParticipants = async () => {
            setLoading(true);
            const createdName = await retrieveAccountName(session.createdBy, availableAccounts);
            const updatedName = await retrieveAccountName(session.lastUpdatedBy, availableAccounts);
            if (createdName) {
                setCreatedByName(createdName);
            }
            if (updatedName) {
                setUpdatedByName(updatedName);
            }

            const fetchedParticipants = await getParticipantsBySessionId(session.id);
            setParticipants(fetchedParticipants.map(participant => participant.account));
            setLoading(false);
        };

        fetchNamesAndParticipants();
    }, [session.createdBy, session.lastUpdatedBy, session.id, availableAccounts]);

    if (loading) return (
        <Loader />
    )

    return (
        <div className={styles.container}>
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
                    {participants.length > 0 && (
                        <>
                            <strong>Participants: </strong>
                            <div className={styles.participantAvatars}>
                                {participants.map((participant, index) => (
                                    <Avatar key={index} accountId={participant.id} size={40} />
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
