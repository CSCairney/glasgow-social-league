export type Session = {
    id: number;
    sportId: number;
    date: string;
    createdBy: string;
    lastUpdatedBy: string;
    seasonId: number;
    participants?: SessionParticipant[];
};

export type SessionRequest = {
    sportId: number;
    date?: string;
    createdBy: string;
    lastUpdatedBy?: string;
    seasonId: number;
};


export type SessionParticipant = {
    sessionId: number;
    accountId: string;
};


export type SessionRecentTableData = {
    date: string;
    createdBy: string;
    lastUpdatedBy: string;
    seasonId: number;
}


export type SessionQueryParams = {
    page?: number;
    size?: number;
    sportId?: number
    includeParticipants?: boolean;
};
