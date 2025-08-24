import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ComponentContainerVagasComponent } from '../../components/component-container-vagas/component-container-vagas.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CardVagaPublicaComponent } from '../../components/cards/card-vaga-publica/card-vaga-publica.component';
import { EStatusVaga } from '../../enum/EStatusVaga.enum';
import { ERoleUser } from '../../enum/ERoleUser.enum';
import { CardVagaEmpresaComponent } from '../../components/cards/card-vaga-empresa/card-vaga-empresa.component';
import { Router, RouterModule } from '@angular/router';
import { IVaga } from '../../interface/IVaga.interface';
import { VagasService } from '../../../../services/vaga/vagas.service';
import { HomeAdminComponent } from '../home-admin/home-admin.component';
import { AreasAtuacaoService } from '../../../../services/areasAtuacao/areas-atuacao.service';
import { IAreasAtuacao } from '../../interface/IAreasAtuacao.interface';
import { AuthService } from '../../../../services/auth-caparao/login.service';
import { EmpyComponent } from '../../components/empy/empy.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

export interface GrupoDeVagas {
  area: IAreasAtuacao;
  vagas: IVaga[];
}

@Component({
  selector: 'app-home',
  standalone: true, // Adicionado para clareza
  imports: [
    CommonModule, // Adicionado para diretivas como @if, @for
    CabecalhoComponent,
    FooterComponent,
    ComponentContainerVagasComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    CardVagaPublicaComponent,
    CardVagaEmpresaComponent,
    RouterModule,
    HomeAdminComponent,
    EmpyComponent,
    SpinnerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private router = inject(Router);
  private vagasService = inject(VagasService);
  private areasService = inject(AreasAtuacaoService);
  private userAuth = inject(AuthService);

  public todasAsVagas = signal<IVaga[]>([]);
  public areasAtuacao = signal<IAreasAtuacao[]>([]);
  public user = this.userAuth.currentUser;

  public role = computed(() => {
    const roleName = this.user()?.tipo_usuario?.nome;
    return (roleName as ERoleUser) || ERoleUser.GUEST;
  });
  public roleEnum = ERoleUser;

  public statusCarregamento = signal<'carregando' | 'concluido' | 'erro'>(
    'carregando'
  );

  public vagasRecomendadas = computed(() => {
    const user = this.user();
    const vagas = this.todasAsVagas();

    const userAreaId =
      user?.pessoa?.pessoas_fisica?.area_atuacao?.id_areas_atuacao;

    if (this.role() !== ERoleUser.CANDIDATO || userAreaId == null) {
      return [];
    }
    return vagas.filter(
      (v) =>
        v.area_atuacao?.id_areas_atuacao === userAreaId &&
        v.status === EStatusVaga.EM_ANDAMENTO
    );
  });

  public vagasAgrupadasPorArea = computed(() => {
    const todas = this.todasAsVagas().filter(
      (v) => v.status === EStatusVaga.EM_ANDAMENTO
    );
    const recomendadas = this.vagasRecomendadas();
    const recomendadasIds = new Set(recomendadas.map((v) => v.id_vagas));

    const vagasRestantes = todas.filter(
      (v) => !recomendadasIds.has(v.id_vagas)
    );

    const mapaDeGrupos = new Map<number, GrupoDeVagas>();
    for (const vaga of vagasRestantes) {
      if (!vaga.area_atuacao) continue;
      const areaId = vaga.area_atuacao.id_areas_atuacao;
      if (!mapaDeGrupos.has(areaId)) {
        mapaDeGrupos.set(areaId, { area: vaga.area_atuacao, vagas: [] });
      }
      mapaDeGrupos.get(areaId)!.vagas.push(vaga);
    }
    return Array.from(mapaDeGrupos.values());
  });

  public vagasOfertadas = computed(() => {
    const user = this.user();
    if (this.role() !== ERoleUser.EMPRESA || !user) return [];
    return this.todasAsVagas().filter(
      (vaga) =>
        vaga.id_empresas === user.id_pessoas &&
        (vaga.status === EStatusVaga.EM_ANDAMENTO ||
          vaga.status === EStatusVaga.INATIVO)
    );
  });

  public vagasEncerradas = computed(() => {
    const user = this.user();
    if (this.role() !== ERoleUser.EMPRESA || !user) return [];
    return this.todasAsVagas().filter(
      (vaga) =>
        vaga.id_empresas === user.id_pessoas &&
        vaga.status === EStatusVaga.FINALIZADO
    );
  });

  ngOnInit(): void {
    this.getVagas();
    this.onListAreasAtuacao();
  }

  public getVagas() {
    this.statusCarregamento.set('carregando');
    this.vagasService.httpListVagas$().subscribe({
      next: (data) => {
        this.todasAsVagas.set(data);
        this.statusCarregamento.set('concluido');
      },
      error: (error) => {
        console.error('Erro ao buscar vagas:', error);
        this.statusCarregamento.set('erro');
      },
    });
  }

  public onListAreasAtuacao() {
    this.areasService.httpListAreas$().subscribe({
      next: (response) => this.areasAtuacao.set(response),
      error: (error) => console.log('Erro ao buscar áreas:', error),
    });
  }

  navegarParaDetalhe(vaga: IVaga) {
    if (vaga?.id_vagas) {
      this.router.navigate(['/detalhe-da-vaga', vaga.id_vagas]);
    }
  }
}
