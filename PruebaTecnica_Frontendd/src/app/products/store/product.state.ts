import { Product } from '../models/product.model';
    import { HttpErrorResponse } from '@angular/common/http';

    export interface ProductState {
        products: Product[];
        selectedProduct: Product | null;
        loading: boolean;
        error: HttpErrorResponse | null;
    }

    export const initialProductState: ProductState = {
        products: [],
        selectedProduct: null,
        loading: false,
        error: null
    };