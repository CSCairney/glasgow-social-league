import sessionSlice from "@/redux/stores/session/sessionSlice";

export const {
    setSessionState,
    setSessionId,
    setParticipants,
    setMatches,
    setAvailableAccounts,
    clearSessionState
} = sessionSlice.actions;

export default sessionSlice.reducer;