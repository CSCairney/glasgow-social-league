import { useSessions } from "@/api/sessions/useSession";
import { toast } from "react-toastify";
import { Session, SessionRecentTableData } from "@/types/sessions";
import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useAccounts } from "@/api/accounts/useAccounts";
import styles from "./styles.module.scss";
import { Account } from "@/types/account";
import clsx from "clsx";
import Loader from "@/components/common/Loader";
import {formatDateString} from "@/helpers/dates";

export const SessionRecent = () => {
    const { getAccountById } = useAccounts();
    const [loading, setLoading] = useState(false);
    const [rowData, setRowData] = useState<SessionRecentTableData[]>([]);
    const [columnDefs, setColumnDefs] = useState<any[]>([]);
    const { getAllSessions } = useSessions();

    const getAccount = async (id: string): Promise<string> => {
        let accountName = "";
        try {
            const account: Account = await getAccountById(id);
            if (account.id) {
                accountName = account.name;
            }
        } catch (error) {
            console.error("Error getting account:", error);
        }
        return accountName;
    };

    const updateRowData = async (sessions: Session[]): Promise<void> => {
        const data: SessionRecentTableData[] = await Promise.all(
            sessions.map(async (session) => ({
                date: formatDateString(session.date),
                createdBy: await getAccount(session.createdBy),
                lastUpdatedBy: await getAccount(session.lastUpdatedBy),
                seasonId: session.seasonId,
            }))
        );
        setRowData(data);
    };

    const updateColumnData = (sessionRecentTableData: SessionRecentTableData[]) => {
        if (sessionRecentTableData.length > 0) {
            const columns = Object.keys(sessionRecentTableData[0])
                .filter((key) => key !== "id" && key !== "sportId")
                .map((key) => ({
                    field: key,
                }));
            setColumnDefs(columns);
        }
    };


    const fetchAllSessions = async () => {
        setLoading(true);
        try {
            const sessions = await getAllSessions();
            if (sessions.length > 0) {
                await updateRowData(sessions);
                updateColumnData(sessions);
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

    return (
        <div className={clsx("ag-theme-alpine-dark", styles.container)}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                loading={loading}
            />
        </div>
    );
};
