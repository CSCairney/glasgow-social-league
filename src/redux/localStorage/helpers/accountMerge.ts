import {accountState} from "@/redux/stores/account/types/account";
import merge from "lodash/merge";
import {settingsPersistenceService} from "@/redux/localStorage/persistence";

export function createDefaultAccountSettings(): accountState {
    return {
        id: null,
        name: "",
        email: "",
        token: ""
    };
}

export function createMergedAccountSettings(
    defaultAccountSettings: accountState,
    persistedAccountSettings?: accountState
): accountState {
    const mergedSettings: accountState = merge(
        defaultAccountSettings,
        persistedAccountSettings
    );

    return {
        ...mergedSettings,
    };
}

export function createAccountSettings(): accountState {
    const defaultAccountSettings: accountState = createDefaultAccountSettings();
    const persistedData = settingsPersistenceService.getAccountSettings();

    if (persistedData !== null) {
        return createMergedAccountSettings(
            defaultAccountSettings,
            persistedData
        );
    }
    return defaultAccountSettings;
}