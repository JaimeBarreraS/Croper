import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { ProductEffects } from './products/store/product.effects';
import { productReducer } from './products/store/product.reducer';
import { ProductListComponent } from './products/components/product-list/product-list.component';

@NgModule({
    declarations: [
        AppComponent,
        ProductListComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        StoreModule.forRoot({ products: productReducer }),
        EffectsModule.forRoot([ProductEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retiene las últimas 25 acciones
            logOnly: environment.production, // Restricción para prod
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }