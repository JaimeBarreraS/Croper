import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as ProductActions from '../../store/product.actions';
import * as ProductSelectors from '../../store/product.selectors';
import { Product } from '../../models/product.model';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
    products$: Observable<Product[]>;
    loading$: Observable<boolean>;
    error$: Observable<any>;
    currentPage$: Observable<number>;
    pageSize$: Observable<number>;
    totalItems$: Observable<number>;

    productForm: FormGroup;
    editMode = false;
    selectedProductId: number | null = null;
    errorMessage: string | null = null;
    successMessage: string | null = null;

    // Para usar en la plantilla
    Math = Math;

    // Para limpieza de las suscripciones
    private destroy$ = new Subject<void>();

    constructor(
        private store: Store,
        private fb: FormBuilder
    ) {
        this.products$ = this.store.select(ProductSelectors.selectPaginatedProducts);
        this.loading$ = this.store.select(ProductSelectors.selectProductsLoading);
        this.error$ = this.store.select(ProductSelectors.selectProductsError);
        this.currentPage$ = this.store.select(ProductSelectors.selectCurrentPage);
        this.pageSize$ = this.store.select(ProductSelectors.selectPageSize);
        this.totalItems$ = this.store.select(ProductSelectors.selectTotalItems);

        this.initForm();

        // Suscribirse a los errores para mostrar mensajes
        this.error$.pipe(takeUntil(this.destroy$)).subscribe(error => {
            if (error) {
                this.errorMessage = `Error: ${error}`;
                setTimeout(() => this.errorMessage = null, 5000);
            }
        });
    }

    ngOnInit(): void {
        this.loadProducts();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    initForm(): void {
        this.productForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', [Validators.required, Validators.minLength(10)]],
            price: [0, [Validators.required, Validators.min(0)]],
            stock: [0, [Validators.required, Validators.min(0)]]
        });
    }

    loadProducts(): void {
        this.store.dispatch(ProductActions.loadProducts());
    }

    onPageChange(page: number): void {
        this.store.dispatch(ProductActions.setCurrentPage({ page }));
    }

    onSubmit(): void {
        if (this.productForm.invalid) {
            this.errorMessage = 'Por favor, complete correctamente todos los campos del formulario';
            this.markFormGroupTouched(this.productForm);
            return;
        }

        const product: Product = {
            ...this.productForm.value
        };

        if (this.editMode && this.selectedProductId) {
            product.id = this.selectedProductId;
            this.store.dispatch(ProductActions.updateProduct({ product }));
            this.successMessage = 'Producto actualizado con éxito';
        } else {
            this.store.dispatch(ProductActions.createProduct({ product }));
            this.successMessage = 'Producto creado con éxito';
        }

        this.resetForm();
        setTimeout(() => {
            this.successMessage = null;
        }, 3000);
    }

    onEdit(product: Product): void {
        this.editMode = true;
        this.selectedProductId = product.id;
        this.productForm.patchValue({
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock
        });
    }

    onDelete(id: number): void {
        if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            this.store.dispatch(ProductActions.deleteProduct({ id }));
            this.successMessage = 'Producto eliminado con éxito';
            setTimeout(() => {
                this.successMessage = null;
            }, 3000);
        }
    }

    resetForm(): void {
        this.productForm.reset({
            name: '',
            description: '',
            price: 0,
            stock: 0
        });
        this.editMode = false;
        this.selectedProductId = null;
    }

    clearMessages(): void {
        this.errorMessage = null;
        this.successMessage = null;
    }

    // Marcar todos los campos como tocados para mostrar validaciones
    markFormGroupTouched(formGroup: FormGroup): void {
        Object.values(formGroup.controls).forEach(control => {
            control.markAsTouched();
            if (control instanceof FormGroup) {
                this.markFormGroupTouched(control);
            }
        });
    }
}