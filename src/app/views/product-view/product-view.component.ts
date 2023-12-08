import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {comicsFeature, ComicsState} from './store/comics.reducer';
import { getComics } from './store/comics.actions';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css',
})
export class ProductViewComponent implements OnInit {
  
  readonly comics$ = this.store.select(comicsFeature.selectAll);
  readonly loading$ = this.store.select(comicsFeature.selectComicsLoading);
  
  constructor(private readonly store: Store<ComicsState>) {}

  ngOnInit(): void {
    this.store.dispatch(getComics());
  }
}
