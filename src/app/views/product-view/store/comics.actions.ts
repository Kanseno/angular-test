import {createAction, props} from "@ngrx/store";
import {Comics} from "../../../model/Comics";

export const getComics = createAction(
  '[comics] get comics'
)

export const getComicsSuccess = createAction(
  '[comics] get comics success',
  props<{ comics: Comics[] }>()
)
