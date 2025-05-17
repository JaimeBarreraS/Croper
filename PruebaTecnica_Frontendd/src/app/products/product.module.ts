import { NgModule } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { FormsModule, ReactiveFormsModule } from '@angular/forms';
    import { HttpClientModule } from '@angular/common/http';
    import { RouterModule, Routes } from '@angular/router';

    import { StoreModule } from '@ngrx/store';
    import { EffectsModule } from '@ngrx/effects';
    import { productReducer } from './store/product.reducer';
    import { ProductEffects } from './store/product.effects';

    import { ProductListComponent } from './components/product-list/product-list.component';
    import { ProductDetailsComponent } from './components/product-details/product-details.component';

    const routes: Routes = [
        { path: '', component: ProductListComponent },
        { path: 'details/:id', component: ProductDetailsComponent }
    ];

    @NgModule({
        declarations: [
            ProductListComponent,
            ProductDetailsComponent
        ],
        imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            HttpClientModule,
            RouterModule.forChild(routes),
            StoreModule.forFeature('products', productReducer), // Registrar el reductor
            EffectsModule.forFeature([ProductEffects])       // Registrar los efectos
        ]
    })
    export class ProductsModule {}