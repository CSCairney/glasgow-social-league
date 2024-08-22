import { sportState } from "@/redux/stores/sport/types/sport";
import merge from "lodash/merge";
import { settingsPersistenceService } from "../persistence";

export function createDefaultSportSettings(): sportState {
    return {
        id: null,
        name: "",
        description: "",
    };
}

export function createMergedSportSettings(
    defaultSportSettings: sportState,
    persistedSportSettings?: sportState
): sportState {
    const mergedSettings: sportState = merge(
        defaultSportSettings,
        persistedSportSettings
    );

    return {
        ...mergedSettings,
    };
}

export function createSportSettings(): sportState {
    const defaultSportSettings: sportState = createDefaultSportSettings();
    const persistedData = settingsPersistenceService.getSportSettings();

    if (persistedData !== null) {
        return createMergedSportSettings(
            defaultSportSettings,
            persistedData
        );
    }
    return defaultSportSettings;
}
