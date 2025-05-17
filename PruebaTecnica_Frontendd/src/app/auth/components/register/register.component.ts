import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth.actions';
import { selectAuthLoading, selectAuthError, selectRegisterSuccessMessage } from '../../store/auth.selectors';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
    selector: 'app-register',
    standalone: true, // Mark as standalone
    imports: [ReactiveFormsModule, CommonModule], // Import ReactiveFormsModule and CommonModule
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm!: FormGroup;
    loading$!: Observable<boolean>;
    error$!: Observable<string | null>;
    registerSuccessMessage$!: Observable<string | null>;

    constructor(private fb: FormBuilder, private store: Store, private router: Router) {}

    ngOnInit(): void {
        this.loading$ = this.store.select(selectAuthLoading);
        this.error$ = this.store.select(selectAuthError).pipe(
            map((error: HttpErrorResponse | null) => error ? error.message : null)
        );
        this.registerSuccessMessage$ = this.store.select(selectRegisterSuccessMessage);

        this.registerForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    onSubmit(): void {
        if (this.registerForm.valid) {
            const authRequest = this.registerForm.value;
            this.store.dispatch(AuthActions.register({ authRequest }));
        }
    }

    navigateToLogin(): void {
        this.router.navigate(['/login']);
    }
}