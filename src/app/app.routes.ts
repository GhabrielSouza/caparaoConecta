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
import { FavoritasComponent } from './modules/caparaoConecta/pages/favoritas/favoritas.component';
import { authGuardGuard } from './guard/auth-guard.guard';
import { PesquisarComponent } from './modules/caparaoConecta/pages/pesquisar/pesquisar.component';
import { ResetEmailComponent } from './modules/caparaoConecta/pages/reset-email/reset-email.component';
import { ResetPasswordComponent } from './modules/caparaoConecta/pages/reset-password/reset-password.component';
import { VisualizarPerfilComponent } from './modules/caparaoConecta/pages/visualizar-perfil/visualizar-perfil.component';

export const routes: Routes = [
  {
    path: 'cadastroEmpresa',
    component: FormCadastroEmpresaComponent,
  },
  {
    path: 'cadastroCandidato',
    component: FormCadastroCandidatoComponent,
  },
  {
    path: 'login',
    component: FormLoginComponent,
  },
  {
    path: 'reset-email',
    component: ResetEmailComponent,
  },
  {
    path: 'password-reset/:token',
    component: ResetPasswordComponent,
  },
  { path: 'home', component: HomeComponent },
  {
    path: 'detalhe-da-vaga/:id',
    component: DetalheDaVagaComponent,
    canActivate: [authGuardGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuardGuard],
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [authGuardGuard],
  },
  {
    path: 'perfil/:id',
    component: VisualizarPerfilComponent,
    canActivate: [authGuardGuard],
  },
  {
    path: 'habilidades',
    component: HabilidadesComponent,
    canActivate: [authGuardGuard],
  },
  { path: 'cursos', component: CursosComponent, canActivate: [authGuardGuard] },
  {
    path: 'Minhas Vagas',
    component: FavoritasComponent,
    canActivate: [authGuardGuard],
  },
  {
    path: 'pesquisa',
    component: PesquisarComponent,
    canActivate: [authGuardGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
