import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import * as fromAuth from './store/auth.reducer';
import { AuthEffects } from './store/auth.effects';
import { AuthService } from './services/auth.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ]),
        HttpClientModule,
        StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.authReducer),
        EffectsModule.forFeature([AuthEffects]),
        LoginComponent, // Import standalone component
        RegisterComponent // Import standalone component
    ],
    providers: [
        AuthService,
        AuthGuard,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    exports: [
        LoginComponent,
        RegisterComponent
    ]
})
export class AuthModule {}