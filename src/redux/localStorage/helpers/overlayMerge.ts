import { overlayState } from "@/redux/stores/overlay/types/overlay";
import merge from "lodash/merge";
import { settingsPersistenceService } from "../persistence";

export function createDefaultOverlaySettings(): overlayState {
  return {
    isLoading: false,
    error: "",
    errorLog: [],
  }
}

export function createMergedOverlaySettings(
  defaultOverlaySettings: overlayState,
  persistedOverlaySettings?: overlayState
): overlayState {
  const mergedSettings: overlayState = merge(
    defaultOverlaySettings,
    persistedOverlaySettings
  );

  return {
    ...mergedSettings,
  };
}

export function createOverlaySettings(): overlayState {
  const defaultOverlaySettings: overlayState =
  createDefaultOverlaySettings();
  const persistedData =
    settingsPersistenceService.getOverlaySettings();

  if (persistedData !== null) {
    return createMergedOverlaySettings(
        defaultOverlaySettings,
      persistedData
    );
  }
  return defaultOverlaySettings;
}