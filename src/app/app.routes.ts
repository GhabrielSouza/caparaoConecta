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
import { PagePesquisaComponent } from './modules/caparaoConecta/pages/page-pesquisa/page-pesquisa.component';

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
  { path: '', component: HomeComponent },
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
    children: [
      {
        path: 'perfil:id',
        component: PerfilComponent,
      },
    ],
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
    path: 'Pesquisar', 
    component: PagePesquisaComponent,
    children: [
      {
        path: 'Empresas',
        component: PagePesquisaComponent
      },
      {
        path: 'Candidatos',
        component: PagePesquisaComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
  },
];
