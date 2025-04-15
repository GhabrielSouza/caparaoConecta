import { Routes } from '@angular/router';
import { HomeComponent } from './modules/caparaoConecta/pages/home/home.component';
import { FormLoginComponent } from './modules/caparaoConecta/pages/form-login/form-login.component';
import { FormCadastroCandidatoComponent } from './modules/caparaoConecta/pages/form-cadastro-candidato/form-cadastro-candidato.component';
import { FormCadastroEmpresaComponent } from './modules/caparaoConecta/pages/form-cadastro-empresa/form-cadastro-empresa.component';
import { CardPerfilComponent } from './modules/caparaoConecta/components/card-perfil/card-perfil.component';
import { DashboardComponent } from './modules/caparaoConecta/pages/dashboard/dashboard.component';
import { PerfilComponent } from './modules/caparaoConecta/pages/perfil/perfil.component';




export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: FormLoginComponent,
  },
  {
    path: 'singUpEnterprise',
    component: FormCadastroEmpresaComponent,
  },
  {
    path: 'singUp',
    component:FormCadastroCandidatoComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'perfil',
    component:PerfilComponent,
  }
];
