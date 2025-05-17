import { createFeatureSelector, createSelector } from '@ngrx/store';
    import { ProductState } from './product.state';

    export const selectProductState = createFeatureSelector<ProductState>('products'); // Nombre de la característica

    export const selectProducts = createSelector(
        selectProductState,
        (state: ProductState) => state.products
    );

    export const selectSelectedProduct = createSelector(
        selectProductState,
        (state: ProductState) => state.selectedProduct
    );

    export const selectProductLoading = createSelector(
        selectProductState,
        (state: ProductState) => state.loading
    );

    export const selectProductError = createSelector(
        selectProductState,
        (state: ProductState) => state.error
    );