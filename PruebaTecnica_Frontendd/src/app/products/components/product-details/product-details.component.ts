import { Component, OnInit } from '@angular/core';
        import { ActivatedRoute, Router } from '@angular/router';
        import { Store } from '@ngrx/store';
        import { Observable } from 'rxjs';
        import { Product } from '../../models/product.model';
        import * as ProductActions from '../../store/product.actions';
        import { selectSelectedProduct, selectProductLoading, selectProductError } from '../../store/product.selectors';
        import { FormBuilder, FormGroup, Validators } from '@angular/forms';

        @Component({
            selector: 'app-product-details',
            templateUrl: './product-details.component.html',
            styleUrls: ['./product-details.component.css']
        })
        export class ProductDetailsComponent implements OnInit {
            product$: Observable<Product | null>;
            loading$: Observable<boolean>;
            error$: Observable<any>;
            productForm: FormGroup;
            isEditing = false;

            constructor(
                private route: ActivatedRoute,
                private router: Router,
                private store: Store,
                private fb: FormBuilder
            ) {
                this.product$ = this.store.select(selectSelectedProduct);
                this.loading$ = this.store.select(selectProductLoading);
                this.error$ = this.store.select(selectProductError);
            }

            ngOnInit(): void {
                this.route.params.subscribe(params => {
                    const id = +params['id']; // Obtener el ID de la URL
                    if (id) {
                        this.store.dispatch(ProductActions.loadProduct({ id }));
                    }
                });

                this.productForm = this.fb.group({
                    id: [{ value: '', disabled: true }],
                    nombre: ['', Validators.required],
                    descripcion: [''],
                    precio: [0, Validators.required],
                    categoria: ['']
                });

                this.product$.subscribe(product => {
                    if (product) {
                        this.productForm.patchValue(product);
                    }
                });
            }

            startEditing(): void {
                this.isEditing = true;
                this.productForm.enable();
            }

            cancelEditing(): void {
                this.isEditing = false;
                this.productForm.disable();
                this.product$.subscribe(product => {
                    if (product) {
                        this.productForm.patchValue(product);
                    }
                }).unsubscribe(); // Unsubscribe immediately to avoid memory leaks
            }

            saveProduct(): void {
                if (this.productForm.valid) {
                    const product = this.productForm.value;
                    if (product.id) {
                        this.store.dispatch(ProductActions.updateProduct({ id: product.id, product }));
                    } else {
                        this.store.dispatch(ProductActions.createProduct({ product }));
                    }
                    this.isEditing = false;
                    this.productForm.disable();
                    this.router.navigate(['/products']);  // Navigate back to product list
                }
            }
        }