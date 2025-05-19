import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';
import { Product } from '../models/product.model';

export interface ProductState {
    products: Product[];
    loading: boolean;
    error: any;
    currentPage: number;
    pageSize: number;
    totalItems: number;
}

export const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
    currentPage: 1,
    pageSize: 5,
    totalItems: 0
};

export const productReducer = createReducer(
    initialState,

    on(ProductActions.loadProducts, state => ({
        ...state,
        loading: true,
        error: null
    })),

    on(ProductActions.loadProductsSuccess, (state, { products }) => ({
        ...state,
        loading: false,
        products,
        totalItems: products.length
    })),

    on(ProductActions.loadProductsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(ProductActions.createProductSuccess, (state, { product }) => ({
        ...state,
        products: [...state.products, product],
        totalItems: state.totalItems + 1
    })),

    on(ProductActions.updateProductSuccess, (state, { product }) => ({
        ...state,
        products: state.products.map(p => p.id === product.id ? product : p)
    })),

    on(ProductActions.deleteProductSuccess, (state, { id }) => ({
        ...state,
        products: state.products.filter(p => p.id !== id),
        totalItems: state.totalItems - 1
    })),

    on(ProductActions.setCurrentPage, (state, { page }) => ({
        ...state,
        currentPage: page
    }))
);