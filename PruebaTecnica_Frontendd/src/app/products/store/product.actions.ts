import { createAction, props } from '@ngrx/store';
    import { Product } from '../models/product.model';
    import { HttpErrorResponse } from '@angular/common/http';

    export const loadProducts = createAction('[Product] Load Products');
    export const loadProductsSuccess = createAction(
        '[Product] Load Products Success',
        props<{ products: Product[] }>()
    );
    export const loadProductsFailure = createAction(
        '[Product] Load Products Failure',
        props<{ error: HttpErrorResponse }>()
    );

    export const loadProduct = createAction(
        '[Product] Load Product',
        props<{ id: number }>()
    );
    export const loadProductSuccess = createAction(
        '[Product] Load Product Success',
        props<{ product: Product }>()
    );
    export const loadProductFailure = createAction(
        '[Product] Load Product Failure',
        props<{ error: HttpErrorResponse }>()
    );

    export const createProduct = createAction(
        '[Product] Create Product',
        props<{ product: Product }>()
    );
    export const createProductSuccess = createAction(
        '[Product] Create Product Success',
        props<{ product: Product }>()
    );
    export const createProductFailure = createAction(
        '[Product] Create Product Failure',
        props<{ error: HttpErrorResponse }>()
    );

    export const updateProduct = createAction(
        '[Product] Update Product',
        props<{ id: number; product: Product }>()
    );
    export const updateProductSuccess = createAction(
        '[Product] Update Product Success',
        props<{ product: Product }>()
    );
    export const updateProductFailure = createAction(
        '[Product] Update Product Failure',
        props<{ error: HttpErrorResponse }>()
    );

    export const deleteProduct = createAction(
        '[Product] Delete Product',
        props<{ id: number }>()
    );
    export const deleteProductSuccess = createAction(
        '[Product] Delete Product Success',
        props<{ id: number }>()
    );
    export const deleteProductFailure = createAction(
        '[Product] Delete Product Failure',
        props<{ error: HttpErrorResponse }>()
    );

    export const loadProductsByCategory = createAction(
        '[Product] Load Products By Category',
        props<{ category: string }>()
    );
    export const loadProductsByCategorySuccess = createAction(
        '[Product] Load Products By Category Success',
        props<{ products: Product[] }>()
    );
    export const loadProductsByCategoryFailure = createAction(
        '[Product] Load Products By Category Failure',
        props<{ error: HttpErrorResponse }>()
    );