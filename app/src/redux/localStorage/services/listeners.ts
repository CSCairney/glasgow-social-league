import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { clearOverlayState, setErrorLog, setErrorMessage, setIsLoading, setOverlayState } from "../../stores/overlay";
import { RootState } from "@/app/store";
import { settingsPersistenceService } from "../persistence";
import {clearAccountState, setAccountState, setEmail, setId, setName, setToken} from "@/redux/stores/account";
import {clearSportState, setSportDescription, setSportId, setSportName, setSportState} from "@/redux/stores/sport";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    matcher: isAnyOf(
      setOverlayState,
      setErrorMessage,
      setErrorLog,
      setIsLoading,
      clearOverlayState,
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

listenerMiddleware.startListening({
    matcher: isAnyOf(
        setAccountState,
        setName,
        setEmail,
        setToken,
        setId,
        clearAccountState
    ),
    effect: (_action, listenerApi) => {
        try {
            settingsPersistenceService.setAccountSettings(
                (listenerApi.getState() as RootState).account
            );
        } catch (error) {
            console.error(error);
        }
    },
});

listenerMiddleware.startListening({
    matcher: isAnyOf(
        setSportState,
        setSportName,
        setSportDescription,
        setSportId,
        clearSportState
    ),
    effect: (_action, listenerApi) => {
        try {
            settingsPersistenceService.setSportSettings(
                (listenerApi.getState() as RootState).sport
            );
        } catch (error) {
            console.error(error);
        }
    },
});