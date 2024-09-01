import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SessionState } from "./types/sessionState";
import { createInitialSessionState } from "./sessionState";
import {SessionParticipantWithAccount} from "@/api/sessions/useSessionParticipants";
import {Match, MatchResponseDTO} from "@/types/sports/match";
import {Account} from "@/types/account";

const sessionSlice = createSlice({
    name: "sessionState",
    initialState: createInitialSessionState(),
    reducers: {
        setSessionState: (state, action: PayloadAction<SessionState>) => {
            state.sessionId = action.payload.sessionId;
            state.participants = action.payload.participants;
            state.matches = action.payload.matches;
        },
        setSessionId: (state, action: PayloadAction<number | null>) => {
            state.sessionId = action.payload;
        },
        setParticipants: (state, action: PayloadAction<SessionParticipantWithAccount[]>) => {
            state.participants = action.payload;
        },
        setMatches: (state, action: PayloadAction<MatchResponseDTO[]>) => {
            state.matches = action.payload;
        },
        setAvailableAccounts:(state, action: PayloadAction<Account[]>) => {
          state.availableAccounts = action.payload;
        },
        clearSessionState: (state) => {
            state.sessionId = null;
            state.participants = [];
            state.matches = [];
        },
    },
});

export default sessionSlice;
