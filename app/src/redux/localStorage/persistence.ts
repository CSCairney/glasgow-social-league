import { overlayState } from "../stores/overlay/types/overlay";
import { LocalStorageKeys } from "../constants/localStorage";
import {accountState} from "@/redux/stores/account/types/account";
import {sportState} from "@/redux/stores/sport/types/sport";
import {SessionState} from "@/redux/stores/session/types/sessionState";

export const settingsPersistenceService = {
  // Overlay Settings
  setOverlaySettings: (userSettings: overlayState): void => localStorage.setItem(LocalStorageKeys.OverlaySettings, JSON.stringify(userSettings)),
  getOverlaySettings: (): overlayState => JSON.parse(localStorage.getItem(LocalStorageKeys.OverlaySettings) || "null"),
  // Account Details
  setAccountSettings: (accountDetails: accountState): void => localStorage.setItem(LocalStorageKeys.AccountDetails, JSON.stringify(accountDetails)),
  getAccountSettings: (): accountState | null => JSON.parse(localStorage.getItem(LocalStorageKeys.AccountDetails) || "null"),
  // Sport Details
  setSportSettings: (sportDetails: sportState): void => localStorage.setItem(LocalStorageKeys.SportDetails, JSON.stringify(sportDetails)),
  getSportSettings: (): sportState | null => JSON.parse(localStorage.getItem(LocalStorageKeys.SportDetails) || "null"),
  // Session Details
  setSessionSettings: (sessionDetails: SessionState): void => localStorage.setItem(LocalStorageKeys.SessionDetails, JSON.stringify(sessionDetails)),
  getSessionSettings: (): SessionState | null => JSON.parse(localStorage.getItem(LocalStorageKeys.SessionDetails) || "null"),

};