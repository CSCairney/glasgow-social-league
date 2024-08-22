import { ActionWithThunk } from "@/redux/types/store";
import { sportState } from "@/redux/stores/sport/types/sport";
import { setSportState } from "@/redux/stores/sport";
import {createSportSettings} from "@/redux/localStorage/helpers/sportMerge";

export const getPersistedSportDetails = (): ActionWithThunk => {
    const sportDetails: sportState = createSportSettings();
    return (dispatch) => {
        dispatch(setSportState(sportDetails));
    };
};
