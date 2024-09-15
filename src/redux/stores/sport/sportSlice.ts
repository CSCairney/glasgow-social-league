import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { sportState } from "@/redux/stores/sport/types/sport";
import {createInitialSportState} from "@/redux/stores/sport/sportState";

const sportSlice = createSlice({
    name: "sportState",
    initialState: createInitialSportState(),
    reducers: {
        setSportState: (state, action: PayloadAction<sportState>) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.description = action.payload.description;
        },
        setSportName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setSportDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
        },
        setSportId: (state, action: PayloadAction<number | null>) => {
            state.id = action.payload;
        },
        clearSportState: (state) => {
            state.id = null;
            state.name = "";
            state.description = "";
        },
    },
});

export default sportSlice;
