import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { comicsFeature } from './store/comics.reducer';
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
  readonly loading$ = this.store.select(comicsFeature.selectLoading);
  
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getComics());
  }
}
