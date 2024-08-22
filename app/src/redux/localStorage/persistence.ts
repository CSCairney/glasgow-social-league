import { overlayState } from "../stores/overlay/types/overlay";
import { LocalStorageKeys } from "../constants/localStorage";
import {accountState} from "@/redux/stores/account/types/account";

export const settingsPersistenceService = {
  // Overlay Settings
  setOverlaySettings: (userSettings: overlayState): void => localStorage.setItem(LocalStorageKeys.OverlaySettings, JSON.stringify(userSettings)),
  getOverlaySettings: (): overlayState => JSON.parse(localStorage.getItem(LocalStorageKeys.OverlaySettings) || "null"),
  // Account Details
  setAccountSettings: (accountDetails: accountState): void => localStorage.setItem(LocalStorageKeys.AccountDetails, JSON.stringify(accountDetails)),
  getAccountSettings: (): accountState | null => JSON.parse(localStorage.getItem(LocalStorageKeys.AccountDetails) || "null"),
};