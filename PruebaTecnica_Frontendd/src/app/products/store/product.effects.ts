import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import * as ProductActions from './product.actions';

@Injectable()
export class ProductEffects {

    loadProducts$ = createEffect(() => this.actions$.pipe(
        ofType(ProductActions.loadProducts),
        mergeMap(() => this.productService.getProducts()
            .pipe(
                map(products => ProductActions.loadProductsSuccess({ products })),
                catchError(error => {
                    console.error('Error loading products:', error);
                    return of(ProductActions.loadProductsFailure({ error: error.message }));
                })
            ))
    )
    );

    createProduct$ = createEffect(() => this.actions$.pipe(
        ofType(ProductActions.createProduct),
        mergeMap(({ product }) => this.productService.createProduct(product)
            .pipe(
                map(createdProduct => ProductActions.createProductSuccess({ product: createdProduct })),
                catchError(error => {
                    console.error('Error creating product:', error);
                    return of(ProductActions.createProductFailure({ error: error.message }));
                })
            ))
    )
    );

    updateProduct$ = createEffect(() => this.actions$.pipe(
        ofType(ProductActions.updateProduct),
        mergeMap(({ product }) => this.productService.updateProduct(product)
            .pipe(
                map(() => ProductActions.updateProductSuccess({ product })),
                catchError(error => {
                    console.error('Error updating product:', error);
                    return of(ProductActions.updateProductFailure({ error: error.message }));
                })
            ))
    )
    );

    deleteProduct$ = createEffect(() => this.actions$.pipe(
        ofType(ProductActions.deleteProduct),
        mergeMap(({ id }) => this.productService.deleteProduct(id)
            .pipe(
                map(() => ProductActions.deleteProductSuccess({ id })),
                catchError(error => {
                    console.error('Error deleting product:', error);
                    return of(ProductActions.deleteProductFailure({ error: error.message }));
                })
            ))
    )
    );

    // Efecto para manejar errores generales
    handleErrors$ = createEffect(() => this.actions$.pipe(
        ofType(
            ProductActions.loadProductsFailure,
            ProductActions.createProductFailure,
            ProductActions.updateProductFailure,
            ProductActions.deleteProductFailure
        ),
        tap(action => {
            console.error('Error en la acción:', action.type);
            // Aquí podrías implementar un servicio de notificación global
        })
    ), { dispatch: false });

    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) { }
}