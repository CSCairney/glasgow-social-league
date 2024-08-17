import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { clearOverlayState, setErrorLog, setErrorMessage, setIsLoading, setOverlayState } from "../../stores/overlay";
import { RootState } from "@/app/store";
import { settingsPersistenceService } from "../persistence";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    matcher: isAnyOf(
      setOverlayState,
      setErrorMessage,
      setErrorLog,
      setIsLoading,
      clearOverlayState
    ),
    effect: (_action, listenerApi) => {
      try {
        settingsPersistenceService.setOverlaySettings(
          (listenerApi.getState() as RootState).overlay
        );
      } catch (error) {
        console.error(error);
      }
    },
  });