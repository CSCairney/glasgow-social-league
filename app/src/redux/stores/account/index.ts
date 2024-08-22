import accountSlice from "@/redux/stores/account/accountSlice";

export const {
    setAccountState,
    setName,
    setEmail,
    setToken,
    setId,
    clearAccountState,
} = accountSlice.actions;

export default accountSlice.reducer;