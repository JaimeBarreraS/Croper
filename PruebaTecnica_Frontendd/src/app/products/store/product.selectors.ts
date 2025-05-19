import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';

export const selectProductState = createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(
    selectProductState,
    (state: ProductState) => state.products
);

export const selectProductsLoading = createSelector(
    selectProductState,
    (state: ProductState) => state.loading
);

export const selectProductsError = createSelector(
    selectProductState,
    (state: ProductState) => state.error
);

export const selectCurrentPage = createSelector(
    selectProductState,
    (state: ProductState) => state.currentPage
);

export const selectPageSize = createSelector(
    selectProductState,
    (state: ProductState) => state.pageSize
);

export const selectTotalItems = createSelector(
    selectProductState,
    (state: ProductState) => state.totalItems
);

export const selectPaginatedProducts = createSelector(
    selectAllProducts,
    selectCurrentPage,
    selectPageSize,
    (products, currentPage, pageSize) => {
        const startIndex = (currentPage - 1) * pageSize;
        return products.slice(startIndex, startIndex + pageSize);
    }
);