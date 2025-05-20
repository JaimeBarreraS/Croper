import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
    selector: 'app-registro',
    templateUrl: './registro.component.html',
    styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
    user = {
        username: '',
        email: '',
        password: ''
    };

    errorMessage = '';

    constructor(private authService: AuthService, private router: Router) { }

    register() {
        this.authService.register(this.user).subscribe({
            next: () => {
                this.router.navigate(['/login']);
            },
            error: () => {
                this.errorMessage = 'No se pudo registrar. Intente de nuevo.';
            }
        });
    }
}
