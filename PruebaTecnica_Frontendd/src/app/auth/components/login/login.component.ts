import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth.actions';
import { selectAuthLoading, selectAuthError } from '../../store/auth.selectors';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
    selector: 'app-login',
    standalone: true, // Mark as standalone
    imports: [ReactiveFormsModule, CommonModule], // Import ReactiveFormsModule and CommonModule
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    loading$!: Observable<boolean>;
    error$!: Observable<string | null>;

    constructor(private fb: FormBuilder, private store: Store, private router: Router) {}

    ngOnInit(): void {
        // Initialize observables in ngOnInit to ensure 'store' is initialized
        this.loading$ = this.store.select(selectAuthLoading);
        this.error$ = this.store.select(selectAuthError).pipe(
            map((error: HttpErrorResponse | null) => error ? error.message : null)
        );

        // Initialize the login form
        this.loginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            const authRequest = this.loginForm.value;
            this.store.dispatch(AuthActions.login({ authRequest }));
        }
    }

    // Add the navigateToRegister method
    navigateToRegister(): void {
        this.router.navigate(['/register']);
    }
}