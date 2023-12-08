import {Injectable} from '@angular/core';
import {Observable, map, withLatestFrom} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Comics} from '../../../model/Comics';

@Injectable()
export class ComicsService {
    constructor(public httpClient: HttpClient) {}

    comics$: Observable<Comics[]> = this.httpClient.get<Comics[]>('/assets/data/comics.json');

    comicsNamesToHeroNames: Observable<Record<string, string>> = this.httpClient.get<Record<string, string>>(
        '/assets/data/hero-names.json'
    );

    comicsWithHeroNames$: Observable<Comics[]> = this.comics$.pipe(
        withLatestFrom(this.comicsNamesToHeroNames),
        map(([comics, heroNames]) =>
            comics.map((comic) => ({
                ...comic,
                heroName: heroNames[comic.title],
            }))
        )
    );

}
