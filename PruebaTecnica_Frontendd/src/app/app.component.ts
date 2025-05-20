import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { PaginatedResponse, Product } from './interface/interfaces';
import { NotificationService } from './service/notificacion.service';
import { ProductService } from './service/product.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ProductService], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Administración de Productos';
  
  // Estado de la aplicación
  products: Product[] = [];
  pagedProducts: Product[] = [];


  selectedProduct: Product | null = null;
  isEditing = false;
  showForm = false;
  loading = false;
  error = '';
  success = '';
  
  // Estado de la paginación
  currentPage = 0;
  pageSize = 10;
  totalElements = 0;
  totalPages = 0;
  
  // Formulario
  productForm: FormGroup;
  
  // Suscripciones
  private subscriptions: Subscription = new Subscription();
  
  constructor(
    private productService: ProductService,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      id: [null],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required]],
      precio: [0, [Validators.required, Validators.min(0)]],
      categoria: ['', [Validators.required]]
    });
    
    // Suscribirse a las notificaciones
    this.subscriptions.add(
      this.notificationService.getNotifications().subscribe(notification => {
        if (notification.type === 'success') {
          this.success = notification.message;
          setTimeout(() => this.success = '', 3000);
        } else if (notification.type === 'error') {
          this.error = notification.message;
        }
      })
    );
  }
  
  
  ngOnInit(): void {
    this.loadProducts();
  }
  
  ngOnDestroy(): void {
    // Desuscribirse para evitar fugas de memoria
    this.subscriptions.unsubscribe();
  }
  
  loadProducts(): void {
    this.loading = true;
    this.error = '';
  
    this.productService.getProducts()
      .subscribe({
        next: (products: Product[]) => {
          this.products = products;
          this.totalElements = products.length;
          this.totalPages = Math.ceil(this.totalElements / this.pageSize);
  
          this.setPagedProducts();
          this.loading = false;
        },
      });
  } 

setPagedProducts(): void {
  const start = this.currentPage * this.pageSize;
  const end = start + this.pageSize;
  this.pagedProducts = this.products.slice(start, end);
}  
  
  
  openCreateForm(): void {
    this.isEditing = false;
    this.selectedProduct = null;
    this.resetForm();
    this.showForm = true;
  }
  
  openEditForm(product: Product): void {
    this.isEditing = true;
    this.selectedProduct = product;
    this.productForm.patchValue(product);
    this.showForm = true;
  }
  
  resetForm(): void {
    this.productForm.reset({
      id: null,
      nombre: '',
      descripcion: '',
      precio: 0,
      categoria: ''
    });
  }
  
  cancelForm(): void {
    this.showForm = false;
    this.resetForm();
    this.error = '';
  }
  
  saveProduct(): void {
    if (this.productForm.invalid) {
      this.notificationService.error('Por favor complete todos los campos requeridos correctamente');
      return;
    }
    
    this.loading = true;
    this.error = '';
    const productData: Product = this.productForm.value;
    
    if (this.isEditing) {
      this.productService.updateProduct(productData)
        .subscribe({
          next: (res) => {
            this.notificationService.success('Producto actualizado correctamente');
            this.showForm = false;
            this.loadProducts();
            this.loading = false;
          },
          error: (err) => {
            this.notificationService.error(`Error al actualizar el producto: ${err.message}`);
            this.loading = false;
          }
        });
    } else {
      this.productService.createProduct(productData)
        .subscribe({
          next: (res) => {
            this.notificationService.success('Producto creado correctamente');
            this.showForm = false;
            this.loadProducts();
            this.loading = false;
          },
          error: (err) => {
            this.notificationService.error(`Error al crear el producto: ${err.message}`);
            this.loading = false;
          }
        });
    }
  }
  
  deleteProduct(id: number): void {
    if (confirm('¿Está seguro que desea eliminar este producto?')) {
      this.loading = true;
      this.error = '';
      
      this.productService.deleteProduct(id)
        .subscribe({
          next: (res) => {
            this.notificationService.success('Producto eliminado correctamente');
            this.loadProducts();
            this.loading = false;
          },
          error: (err) => {
            this.notificationService.error(`Error al eliminar el producto: ${err.message}`);
            this.loading = false;
          }
        });
    }
  }
  
  // Funciones de paginación
  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadProducts();
    }
  }
  
  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadProducts();
    }
  }
  
  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadProducts();
    }
  }
  
  // Devuelve un array de números de página para mostrar en la paginación
  get pages(): number[] {
    const pages = [];
    const startPage = Math.max(0, this.currentPage - 2);
    const endPage = Math.min(this.totalPages - 1, this.currentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }
}