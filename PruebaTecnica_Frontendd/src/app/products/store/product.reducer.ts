import { createReducer, on } from '@ngrx/store';
    import { ProductState, initialProductState } from './product.state';
    import * as ProductActions from './product.actions';

    export const productReducer = createReducer(
        initialProductState,
        on(ProductActions.loadProducts, (state) => ({ ...state, loading: true, error: null })),
        on(ProductActions.loadProductsSuccess, (state, { products }) => ({
            ...state,
            loading: false,
            products: products
        })),
        on(ProductActions.loadProductsFailure, (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        })),
        on(ProductActions.loadProduct, (state) => ({ ...state, loading: true, error: null })),
        on(ProductActions.loadProductSuccess, (state, { product }) => ({
            ...state,
            loading: false,
            selectedProduct: product
        })),
        on(ProductActions.loadProductFailure, (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        })),
        on(ProductActions.createProductSuccess, (state, { product }) => ({
            ...state,
            products: [...state.products, product]
        })),
        on(ProductActions.updateProductSuccess, (state, { product }) => ({
            ...state,
            products: state.products.map(p => (p.id === product.id ? product : p))
        })),
        on(ProductActions.deleteProductSuccess, (state, { id }) => ({
            ...state,
            products: state.products.filter(p => p.id !== id)
        })),
        on(ProductActions.loadProductsByCategorySuccess, (state, { products }) => ({
            ...state,
            loading: false,
            products: products
        })),
        on(ProductActions.loadProductsByCategoryFailure, (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }))
    );

    export function reducer(state: ProductState | undefined, action: any) {
        return productReducer(state, action);
    }