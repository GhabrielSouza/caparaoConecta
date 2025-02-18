import { Routes } from '@angular/router';
import { HomeComponent } from './modules/caparaoConecta/pages/home/home.component';
import { FormLoginComponent } from './modules/caparaoConecta/pages/form-login/form-login.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: FormLoginComponent,
  },
];
