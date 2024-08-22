import { configureStore} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import overlayReducer from "../redux/stores/overlay";
import accountReducer from "../redux/stores/account";
import sportReducer from "../redux/stores/sport";
import { listenerMiddleware } from "@/redux/localStorage/services/listeners";

export function createStore(preloadedState = {}) {
    return configureStore({
            preloadedState,
            reducer: {
                overlay: overlayReducer,
                account: accountReducer,
                sport: sportReducer,
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