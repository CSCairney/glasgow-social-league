import { overlayState } from "../stores/overlay/types/overlay";
import { LocalStorageKeys } from "../constants/localStorage";

export const settingsPersistenceService = {
  // Overlay Settings
  setOverlaySettings: (userSettings: overlayState): void => localStorage.setItem(LocalStorageKeys.OverlaySettings, JSON.stringify(userSettings)),
  getOverlaySettings: (): overlayState => JSON.parse(localStorage.getItem(LocalStorageKeys.OverlaySettings) || "null"),
};