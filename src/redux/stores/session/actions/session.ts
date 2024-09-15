import { ActionWithThunk } from "@/redux/types/store";
import {createSessionSettings} from "@/redux/localStorage/helpers/sessionMerge";
import {setSessionState} from "@/redux/stores/session";
import {SessionState} from "@/redux/stores/session/types/sessionState";

export const getPersistedSessionDetails = (): ActionWithThunk => {
    const sessionDetails: SessionState = createSessionSettings();
    return (dispatch) => {
        dispatch(setSessionState(sessionDetails));
    };
};
