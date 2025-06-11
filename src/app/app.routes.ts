import { Routes } from '@angular/router';
import { HomeComponent } from './modules/caparaoConecta/pages/home/home.component';
import { FormLoginComponent } from './modules/caparaoConecta/pages/form-login/form-login.component';
import { FormCadastroCandidatoComponent } from './modules/caparaoConecta/pages/form-cadastro-candidato/form-cadastro-candidato.component';
import { FormCadastroEmpresaComponent } from './modules/caparaoConecta/pages/form-cadastro-empresa/form-cadastro-empresa.component';
import { CardPerfilComponent } from './modules/caparaoConecta/components/cards/card-perfil/card-perfil.component';
import { DashboardComponent } from './modules/caparaoConecta/pages/dashboard/dashboard.component';
import { PerfilComponent } from './modules/caparaoConecta/pages/perfil/perfil.component';
import { DetalhesVagaComponent } from './modules/caparaoConecta/components/detalhes-vaga/detalhes-vaga.component';
import { DetalheDaVagaComponent } from './modules/caparaoConecta/pages/detalhe-da-vaga/detalhe-da-vaga.component';
import { HomeAdminComponent } from './modules/caparaoConecta/pages/home-admin/home-admin.component';
import { HabilidadesComponent } from './modules/caparaoConecta/pages/habilidades/habilidades.component';
import { CursosComponent } from './modules/caparaoConecta/pages/cursos/cursos.component';



export const routes: Routes = [
  
    { path: '', component: HomeComponent },
    { path: 'detalhe-da-vaga/:id', component: DetalheDaVagaComponent }
  ,
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
    component: FormCadastroCandidatoComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'perfil',
    component:PerfilComponent,
  },
  { path: 'homeAdmin',
    component:HomeAdminComponent, 
  },
  { path: 'homeHabilidades',
    component:HabilidadesComponent, 
  },
  { path: 'homeCursos',
    component:CursosComponent, 
  },

];
