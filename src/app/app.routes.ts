import { Routes } from '@angular/router';
import { ProductViewComponent } from './views/product-view/product-view.component';
import { provideState } from '@ngrx/store';
import { comicsFeature } from './views/product-view/store/comics.reducer';
import { provideEffects } from '@ngrx/effects';
import { ComicsEffects } from './views/product-view/store/comics.effects';
import { ComicsService } from './views/product-view/services/comics.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    providers: [
      provideState(comicsFeature),
      provideEffects(ComicsEffects),
      ComicsService,
    ],
    component: ProductViewComponent,
  },
];
