import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { accountState } from "@/redux/stores/account/types/account";
import {createInitialAccountState} from "@/redux/stores/account/accountState";

const accountSlice = createSlice({
    name: "accountState",
    initialState: createInitialAccountState(),
    reducers: {
        setAccountState: (state, action: PayloadAction<accountState>) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.token = action.payload.token;
        },
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setId: (state, action: PayloadAction<number | null>) => {
            state.id = action.payload;
        },
        clearAccountState: (state) => {
            state.id = null;
            state.name = "";
            state.email = "";
            state.token = "";
        },
    },
});

export default accountSlice;
