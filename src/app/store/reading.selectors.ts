import { createFeatureSelector, createSelector } from "@ngrx/store";

import { ReadingState } from "./reading.reducer";

export const selectReadingState = createFeatureSelector<ReadingState>("reading");

export const selectReadingItems = createSelector(
  selectReadingState,
  (state) => state.items
);
