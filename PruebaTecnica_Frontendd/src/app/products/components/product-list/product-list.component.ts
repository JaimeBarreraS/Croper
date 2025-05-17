import { Component, OnInit } from '@angular/core';
        import { Store } from '@ngrx/store';
        import { Observable } from 'rxjs';
        import { Product } from '../../models/product.model';
        import * as ProductActions from '../../store/product.actions';
        import { selectProducts, selectProductLoading, selectProductError } from '../../store/product.selectors';

        @Component({
            selector: 'app-product-list',
            templateUrl: './product-list.component.html',
            styleUrls: ['./product-list.component.css'] 
        })
        export class ProductListComponent implements OnInit {
            products$: Observable<Product[]>;
            loading$: Observable<boolean>;
            error$: Observable<any>;

            constructor(private store: Store) {
                this.products$ = this.store.select(selectProducts);
                this.loading$ = this.store.select(selectProductLoading);
                this.error$ = this.store.select(selectProductError);
            }

            ngOnInit(): void {
                this.store.dispatch(ProductActions.loadProducts());
            }

            deleteProduct(id: number): void {
                this.store.dispatch(ProductActions.deleteProduct({ id }));
            }

            getProductDetails(id: number): void {
                // Navegar a la página de detalles del producto
                // Por ejemplo, usando el Router de Angular
            }
        }