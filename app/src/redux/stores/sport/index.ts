import sportSlice from "@/redux/stores/sport/sportSlice";

export const {
    setSportState,
    setSportName,
    setSportDescription,
    setSportId,
    clearSportState,
} = sportSlice.actions;

export default sportSlice.reducer;
