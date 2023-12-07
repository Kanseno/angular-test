import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ComicsService } from '../services/comics.service';
import { getComics, getComicsSuccess } from './comics.actions';
import { map, mergeMap } from 'rxjs';

@Injectable()
export class ComicsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly comicsService: ComicsService
  ) {}

  loadComics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getComics),
      mergeMap(() => this.comicsService.getComicsWithHeroNames$()),
      map((comics) => getComicsSuccess({ comics }))
    )
  );
}
