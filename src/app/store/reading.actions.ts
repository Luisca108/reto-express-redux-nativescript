import { createAction, props } from "@ngrx/store";

import { Book } from "../models/book";

export const readNow = createAction(
  "[Favoritos] Leer ahora",
  props<{ book: Book }>()
);
