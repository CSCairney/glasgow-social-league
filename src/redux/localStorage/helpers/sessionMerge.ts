import merge from "lodash/merge";
import { settingsPersistenceService } from "../persistence";
import {SessionState} from "@/redux/stores/session/types/sessionState";

export function createDefaultSessionSettings(): SessionState {
    return {
        sessionId: null,
        participants: [],
        matches: [],
        availableAccounts: []
    };
}

export function createMergedSessionSettings(
    defaultSessionSettings: SessionState,
    persistedSessionSettings?: SessionState
): SessionState {
    const mergedSettings: SessionState = merge(
        defaultSessionSettings,
        persistedSessionSettings
    );

    return {
        ...mergedSettings,
    };
}

export function createSessionSettings(): SessionState {
    const defaultSessionSettings: SessionState = createDefaultSessionSettings();
    const persistedData = settingsPersistenceService.getSessionSettings();

    if (persistedData !== null) {
        return createMergedSessionSettings(
            defaultSessionSettings,
            persistedData
        );
    }
    return defaultSessionSettings;
}
