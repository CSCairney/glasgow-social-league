import { RootState } from "@/app/store";
import type { AnyAction, ThunkAction } from "@reduxjs/toolkit";

export type ActionWithThunk<T = void> = ThunkAction<
  T,
  RootState,
  unknown,
  AnyAction
>;

export type AsyncData<T> = {
  isLoading: boolean;
  error: unknown | null;
  data: T | null;
};