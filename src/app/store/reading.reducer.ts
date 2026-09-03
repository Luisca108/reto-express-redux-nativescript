import { createReducer, on } from "@ngrx/store";

import { Book } from "../models/book";
import { readNow } from "./reading.actions";

export interface ReadingState {
  items: Book[];
}

export interface AppState {
  reading: ReadingState;
}

export const initialReadingState: ReadingState = {
  items: []
};

export const readingReducer = createReducer(
  initialReadingState,
  on(readNow, (state, { book }) => ({
    ...state,
    items: [
      book,
      ...state.items.filter((item) => item.id !== book.id)
    ]
  }))
);
