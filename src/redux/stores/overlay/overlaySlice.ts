import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createInitialOverlayState } from "./helpers/initial";
import { overlayState } from "./types/overlay";

const overlaySlice = createSlice({
    name: "overlayState",
    initialState: createInitialOverlayState(),
    reducers: {
    setOverlayState: (state, action: PayloadAction<overlayState>) => {
        state.isLoading = action.payload.isLoading;
        state.error = action.payload.error;
        state.errorLog = action.payload.errorLog;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.errorLog = [...state.errorLog, action.payload];
    },
    setErrorLog: (state, action: PayloadAction<string[]>) => {
        state.errorLog = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
        state.isLoading = action.payload;
    },
    clearOverlayState: (state) => {
        state.isLoading = false;
        state.error = "";
        state.errorLog = [""];
    }
    }})

export default overlaySlice;