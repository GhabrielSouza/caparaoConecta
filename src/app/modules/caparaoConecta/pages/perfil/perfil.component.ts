import { TypedRegistry } from './../../../../../../node_modules/chart.js/dist/types/index.d';
import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin, Observable, of } from 'rxjs';
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
import { IUsuario } from '../../interface/IUsuario.interface';
import { ICursos } from '../../interface/ICursos.inteface';

@Component({
  selector: 'app-perfil',
  standalone: true,
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
export class PerfilComponent implements OnInit {
  private experienciaService = inject(ExperienciasService);
  private formacoesService = inject(FormacoesAcademicasService);
  private habilidadesService = inject(HabilidadesSService);
  private cursosService = inject(CursosSService);
  private userAuth = inject(AuthService);

  public dadosPessoais = signal<IPessoa | null>(null);
  public habilidades = this.habilidadesService.getListHabilidadesOnPessoas;
  public experiencias = this.experienciaService.getListEmpresaId;
  public formacoes = this.formacoesService.getListFormacoesId;
  public cursos = this.cursosService.getListCursosOnPessoaId;

  public statusCarregamento = signal<
    'pendente' | 'carregando' | 'concluido' | 'erro'
  >('pendente');

  public user = this.userAuth.currentUser;
  public role = computed(
    () => (this.user()?.tipo_usuario?.nome as ERoleUser) || ERoleUser.GUEST
  );
  public roleEnum = ERoleUser;

  constructor() {
    effect(() => {
      const currentUser = this.user();
      if (currentUser) {
        this.carregarDadosDoPerfil(currentUser);
      }
    });
  }

  ngOnInit(): void {}

  private carregarDadosDoPerfil(currentUser: IUsuario): void {
    this.statusCarregamento.set('carregando');

    const userRole = currentUser.tipo_usuario?.nome;

    const requests: { [key: string]: Observable<any> } = {
      dadosPessoais: this.userAuth.getUserData(currentUser.id_pessoas),
    };

    if (userRole === ERoleUser.CANDIDATO) {
      requests['experiencias'] = this.experienciaService.httpListExperienciaId$(
        currentUser.id_pessoas
      );
      requests['formacoes'] = this.formacoesService.httpListFormacoesId$(
        currentUser.id_pessoas
      );
      requests['cursos'] = this.cursosService.httpListCursosOnPessoaId$(
        currentUser.id_pessoas
      );
      requests['habilidades'] =
        this.habilidadesService.httpListHabilidadesOnPessoas$(
          currentUser.id_pessoas
        );
    }

    forkJoin(requests).subscribe({
      next: (resultados: any) => {
        this.dadosPessoais.set(resultados.dadosPessoais);

        this.statusCarregamento.set('concluido');
      },
      error: (err) => {
        console.error('Erro ao carregar dados do perfil:', err);
        this.statusCarregamento.set('erro');
      },
    });
  }
}
