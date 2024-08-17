import { overlayState } from "./types/overlay";

export function createInitialDataState(): overlayState {
  return {
    isLoading: false,
    error: "",
    errorLog: []
  };
}