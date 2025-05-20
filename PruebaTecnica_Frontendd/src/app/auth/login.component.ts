import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    credentials = {
        username: '',
        password: ''
    };

    errorMessage = '';

    constructor(private authService: AuthService, private router: Router) { }

    login() {
        this.authService.login(this.credentials).subscribe({
            next: () => this.router.navigate(['/productos']),
            error: () => this.errorMessage = 'Credenciales inválidas.'
        });
    }

}
