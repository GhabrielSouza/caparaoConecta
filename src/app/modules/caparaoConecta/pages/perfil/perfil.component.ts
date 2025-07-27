import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin, of } from 'rxjs'; // Importe forkJoin e of
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ComponentPerfilDadosComponent } from '../../components/component-perfil-dados/component-perfil-dados.component';
import { MatChipsModule } from '@angular/material/chips';
import { PerfilEmpresaComponent } from './perfil-empresa/perfil-empresa.component';
import { PerfilCandidatoComponent } from './perfil-candidato/perfil-candidato.component';
import { IPessoa } from '../../interface/IPessoa.interface';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { FormacoesAcademicasService } from '../../../../services/formacoes/formacoes-academicas.service';
import { HabilidadesSService } from '../../../../services/habilidades/habilidades-s.service';
import { CursosSService } from '../../../../services/cursos/cursos-s.service';

import { ERoleUser } from '../../enum/ERoleUser.enum';
import { ExperienciasService } from './../../../../services/experiencias/experiencias.service';
import { ComponentDefaultPerfilComponent } from '../../components/component-default-perfil/component-default-perfil.component';
import { AuthService } from '../../../../services/auth-caparao/login.service';

@Component({
  selector: 'app-perfil',
  standalone: true, // Adicionado para clareza
  imports: [
    ComponentDefaultPerfilComponent,
    CabecalhoComponent,
    FooterComponent,
    CommonModule,
    ComponentPerfilDadosComponent,
    MatChipsModule,
    PerfilEmpresaComponent,
    PerfilCandidatoComponent,
    SpinnerComponent,
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
})
export class PerfilComponent {
  // --- Injeção de Serviços ---
  private experienciaService = inject(ExperienciasService);
  private formacoesService = inject(FormacoesAcademicasService);
  private habilidadesService = inject(HabilidadesSService);
  private cursosService = inject(CursosSService);
  private userAuth = inject(AuthService);

  // --- Sinais de Estado ---
  public dadosPessoais = signal<IPessoa | null>(null);
  public habilidades = signal<any[]>([]);
  public experiencias = signal<any[]>([]);
  public formacoes = signal<any[]>([]);
  public cursos = signal<any[]>([]);

  // O estado de carregamento agora é mais explícito
  public statusCarregamento = signal<
    'pendente' | 'carregando' | 'concluido' | 'erro'
  >('pendente');

  // --- Sinais Computados ---
  public user = this.userAuth.currentUser;
  public role = computed(
    () => (this.user()?.tipo_usuario?.nome as ERoleUser) || ERoleUser.GUEST
  );
  public roleEnum = ERoleUser;

  constructor() {
    effect(() => {
      const currentUser = this.user();
      if (currentUser) {
        this.carregarDadosDoPerfil(currentUser.id_pessoas);
      }
    });
  }

  private carregarDadosDoPerfil(userId: number): void {
    this.statusCarregamento.set('carregando');

    forkJoin({
      dadosPessoais: this.userAuth.getUserData(userId),
      experiencias: this.experienciaService.httpListExperienciaId$(userId),
      formacoes: this.formacoesService.httpListFormacoesId$(userId),
      cursos: this.cursosService.httpListCursosOnPessoaId$(userId),
      habilidades:
        this.habilidadesService.httpListHabilidadesOnPessoas$(userId),
    }).subscribe({
      next: (resultados) => {
        this.dadosPessoais.set(resultados.dadosPessoais);
        this.experiencias.set(resultados.experiencias);
        this.formacoes.set(resultados.formacoes);
        this.cursos.set(resultados.cursos);
        this.habilidades.set(resultados.habilidades);

        this.statusCarregamento.set('concluido');
      },
      error: (err) => {
        console.error('Erro ao carregar dados do perfil:', err);
        this.statusCarregamento.set('erro');
      },
    });
  }
}
