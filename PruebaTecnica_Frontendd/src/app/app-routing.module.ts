import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //  Aquí definiremos nuestras rutas más adelante
  //  Por ejemplo:
  //  { path: 'login', component: LoginComponent },
  //  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, //  Ruta por defecto
  { path: '**', redirectTo: '/login' } //  Ruta para cualquier otra ruta no definida
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }