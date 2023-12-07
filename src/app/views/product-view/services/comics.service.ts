import { Injectable } from '@angular/core';
import { Observable, map, withLatestFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Comics } from '../../../model/Comics';

@Injectable()
export class ComicsService {
  constructor(public httpClient: HttpClient) {}

  // Returns Comics without hero names
  getProduct(): Observable<Comics[]> {
    return this.httpClient.get<Comics[]>('/assets/data/comics.json');
  }

  // Return map of title to heroName
  getComicsNamesToHeroNames(): Observable<{ [title: string]: string }> {
    return this.httpClient.get<{ [title: string]: string }>(
      '/assets/data/hero-names.json'
    );
  }

  getComicsWithHeroNames$(): Observable<Comics[]> {
    return this.getProduct().pipe(
      withLatestFrom(this.getComicsNamesToHeroNames()),
      map(([comics, heroNames]) => {
        return comics.map((comic) => ({
          ...comic,
          heroName: heroNames[comic.title],
        }));
      })
    );
  }
}
