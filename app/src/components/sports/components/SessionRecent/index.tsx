import { useSessions } from "@/api/sessions/useSession";
import { toast } from "react-toastify";
import { Session, SessionRecentTableData } from "@/types/sessions";
import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import styles from "./styles.module.scss";
import clsx from "clsx";
import Loader from "@/components/common/Loader";
import {formatDateString} from "@/helpers/dates";
import {useAppSelector} from "@/app/store";
import {SessionRecentCard} from "@/components/sports/components/SessionRecentCard";
import {retrieveAccountName} from "@/helpers/accounts";

export type SessionRecentProps = {
    type: 'grid' | 'card'
}

export const SessionRecent = ({ type }:SessionRecentProps) => {
    const [loading, setLoading] = useState(false);
    const [rowData, setRowData] = useState<SessionRecentTableData[]>([]);
    const [sessions, setSession] = useState<Session[]>();
    const sessionAvailableAccounts = useAppSelector(state => state.session.availableAccounts);
    const [columnDefs, setColumnDefs] = useState<any[]>([]);
    const { getAllSessions } = useSessions();

    const updateRowData = async (sessions: Session[]): Promise<void> => {
        const data: SessionRecentTableData[] = await Promise.all(
            sessions.map(async (session) => ({
                date: formatDateString(session.date),
                createdBy: await retrieveAccountName(session.createdBy, sessionAvailableAccounts) || "",
                lastUpdatedBy: await retrieveAccountName(session.lastUpdatedBy, sessionAvailableAccounts) || "",
                seasonId: session.seasonId,
            }))
        );
        console.table(data);
        setRowData(data);
    };

    const updateColumnData = (sessionRecentTableData: SessionRecentTableData[]) => {
        if (sessionRecentTableData.length > 0) {
            const columns = Object.keys(sessionRecentTableData[0])
                .filter((key) => key !== "id" && key !== "sportId")
                .map((key) => ({
                    field: key,
                }));
            console.table(columns)
            setColumnDefs(columns);
        }
    };


    const fetchAllSessions = async () => {
        setLoading(true);
        try {
            const sessions = await getAllSessions();
            if (sessions.length > 0 && type === "grid") {
                await updateRowData(sessions);
                updateColumnData(sessions);
            }
            if (sessions.length > 0 && type === "card") {
                setSession(sessions);
            }
        } catch (error) {
            toast.error(`Failed to fetch recent sessions`);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchAllSessions();
    }, []);

    if (loading) return (
        <div className={styles.container}>
            <Loader />
        </div>
    )

    if (type === "grid") return (
        <div className={clsx("ag-theme-alpine-dark", styles.container)}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                loading={loading}
            />
        </div>
    );

    if (type === "card") return (
        <div className={styles.cardContainer}>
            {sessions?.map((session) => (
                <SessionRecentCard
                    key={session.id}
                    session={session}
                    availableAccounts={sessionAvailableAccounts}
                />
            ))}
        </div>
    );

    return (
        <>Error loading data</>
    )
};
