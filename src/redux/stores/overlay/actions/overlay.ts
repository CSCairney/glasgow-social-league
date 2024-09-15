import { ActionWithThunk } from "@/redux/types/store";
import { setOverlayState } from "..";
import { overlayState } from "../types/overlay";
import { createOverlaySettings } from "@/redux/localStorage/helpers/overlayMerge";

export const getPersistedOverlaySettings = (): ActionWithThunk => {
    const overlaySettings: overlayState = createOverlaySettings();
    return (dispatch) => {
      dispatch(setOverlayState(overlaySettings));
    };
  };