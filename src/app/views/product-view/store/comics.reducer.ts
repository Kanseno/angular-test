import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { getComics, getComicsSuccess } from './comics.actions';
import { Comics } from '../../../model/Comics';

export const COMICS_FEATURE_KEY = 'Comics';

export interface ComicsState extends EntityState<Comics> {
  comicsLoading: boolean;
}

export const comicsAdapter = createEntityAdapter<Comics>({
  selectId: (e) => e.title as string,
});

export const initialState: ComicsState = comicsAdapter.getInitialState({
  comicsLoading: false,
});

export const comicsFeature = createFeature({
  name: COMICS_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(getComics, (state) => ({ ...state, comicsLoading: true })),
    on(getComicsSuccess, (state, { comics }) => ({
      ...comicsAdapter.setAll(comics, state),
      comicsLoading: false,
    }))
  ),
  extraSelectors: ({ selectComicsState }) => ({
    ...comicsAdapter.getSelectors(selectComicsState),
    selectLoading: createSelector(
      selectComicsState,
      (comicsState) => comicsState.comicsLoading
    ),
  }),
});
