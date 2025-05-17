import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'; //  Importa el módulo de enrutamiento

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'; //  Importa la configuración del entorno
import { AuthModule } from './auth/auth.module';
import { AuthInterceptor } from './auth/auth.interceptor';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component'; // Importa AppComponent (necesario para main.ts)

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,   //  Agrega el módulo de enrutamiento a los imports
        HttpClientModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production
        }),
        AuthModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    // declarations: [   <--- Elimina esta línea o el array dentro si solo contiene AppComponent
    //     AppComponent
    // ],
    // bootstrap: [AppComponent]  <--- Elimina esta línea
})
export class AppModule { }