import overlaySlice from "./overlaySlice";

export const {
    setOverlayState,
    setErrorMessage,
    setErrorLog,
    setIsLoading,
    clearOverlayState
} = overlaySlice.actions;

export default overlaySlice.reducer;