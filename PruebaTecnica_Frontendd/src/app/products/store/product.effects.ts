import { Injectable } from '@angular/core';
    import { Actions, createEffect, ofType } from '@ngrx/effects';
    import { of } from 'rxjs';
    import { catchError, map, switchMap } from 'rxjs/operators';
    import { ProductService } from '../services/product.service';
    import * as ProductActions from './product.actions';

    @Injectable()
    export class ProductEffects {
        loadProducts$ = createEffect(() =>
            this.actions$.pipe(
                ofType(ProductActions.loadProducts),
                switchMap(() =>
                    this.productService.getProducts().pipe(
                        map(products => ProductActions.loadProductsSuccess({ products })),
                        catchError(error => of(ProductActions.loadProductsFailure({ error })))
                    )
                )
            )
        );

        loadProduct$ = createEffect(() =>
            this.actions$.pipe(
                ofType(ProductActions.loadProduct),
                switchMap(({ id }) =>
                    this.productService.getProductById(id).pipe(
                        map(product => ProductActions.loadProductSuccess({ product })),
                        catchError(error => of(ProductActions.loadProductFailure({ error })))
                    )
                )
            )
        );

        createProduct$ = createEffect(() =>
            this.actions$.pipe(
                ofType(ProductActions.createProduct),
                switchMap(({ product }) =>
                    this.productService.createProduct(product).pipe(
                        map(newProduct => ProductActions.createProductSuccess({ product: newProduct })),
                        catchError(error => of(ProductActions.createProductFailure({ error })))
                    )
                )
            )
        );

        updateProduct$ = createEffect(() =>
            this.actions$.pipe(
                ofType(ProductActions.updateProduct),
                switchMap(({ id, product }) =>
                    this.productService.updateProduct(id, product).pipe(
                        map(updatedProduct => ProductActions.updateProductSuccess({ product: updatedProduct })),
                        catchError(error => of(ProductActions.updateProductFailure({ error })))
                    )
                )
            )
        );

        deleteProduct$ = createEffect(() =>
            this.actions$.pipe(
                ofType(ProductActions.deleteProduct),
                switchMap(({ id }) =>
                    this.productService.deleteProduct(id).pipe(
                        map(() => ProductActions.deleteProductSuccess({ id })),
                        catchError(error => of(ProductActions.deleteProductFailure({ error })))
                    )
                )
            )
        );

        loadProductsByCategory$ = createEffect(() =>
            this.actions$.pipe(
                ofType(ProductActions.loadProductsByCategory),
                switchMap(({ category }) =>
                    this.productService.getProductsByCategory(category).pipe(
                        map(products => ProductActions.loadProductsByCategorySuccess({ products })),
                        catchError(error => of(ProductActions.loadProductsByCategoryFailure({ error })))
                    )
                )
            )
        );

        constructor(
            private actions$: Actions,
            private productService: ProductService
        ) {}
    }