import {SessionState} from "@/redux/stores/session/types/sessionState";

export function createInitialSessionState(): SessionState {
    return {
        sessionId: null,
        participants: [],
        matches: [],
    };
}
