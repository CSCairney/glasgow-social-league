import { configureStore} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import overlayReducer from "../redux/stores/overlay";
import { listenerMiddleware } from "@/redux/localStorage/services/listeners";

export function createStore(preloadedState = {}) {
    return configureStore({
            preloadedState,
            reducer: {
                overlay: overlayReducer,
            },
            middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().prepend(listenerMiddleware.middleware),
        }
    )
}

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;