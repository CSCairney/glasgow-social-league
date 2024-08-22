import { overlayState } from "./types/overlay";

export function createInitialOverlayState(): overlayState {
  return {
    isLoading: false,
    error: "",
    errorLog: []
  };
}