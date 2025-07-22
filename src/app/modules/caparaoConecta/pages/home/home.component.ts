import { Component, OnInit, signal } from '@angular/core';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ComponentContainerVagasComponent } from '../../components/component-container-vagas/component-container-vagas.component';
import { CardVagaComponent } from '../../components/cards/card-vaga/card-vaga.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { IVagas } from '../../interface/IVagas.interface';
import { CardVagaPublicaComponent } from '../../components/cards/card-vaga-publica/card-vaga-publica.component';
import { EStatusVaga } from '../../enum/EStatusVaga.enum';
import { ERoleUser } from '../../enum/ERoleUser.enum';
import { CardVagaEmpresaComponent } from '../../components/cards/card-vaga-empresa/card-vaga-empresa.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { DetalhesVagaComponent } from '../../components/detalhes-vaga/detalhes-vaga.component';
import { IVaga } from '../../interface/IVaga.interface';
import { VagasService } from '../../../../services/vaga/vagas.service';
import { ContentObserver } from '@angular/cdk/observers';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogHabilidadesAdminComponent } from '../../components/dialogs/dialog-habilidades-admin/dialog-habilidades-admin.component';
import { EDialogEnum } from '../../enum/EDialogEnum.enum';
import { DialogCursosAdminComponent } from '../../components/dialogs/dialog-cursos-admin/dialog-cursos-admin.component';
import { HomeAdminComponent } from '../home-admin/home-admin.component';
import { AreasAtuacaoService } from '../../../../services/areasAtuacao/areas-atuacao.service';
import { IAreasAtuacao } from '../../interface/IAreasAtuacao.interface';
export interface GrupoDeVagas {
  area: IAreasAtuacao;
  vagas: IVaga[];
}
@Component({
  selector: 'app-home',
  imports: [
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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public role: ERoleUser | null = ERoleUser.CANDIDATO;
  public roleEnum = ERoleUser;

  vagasOfertadas: IVaga[] = [];
  vagasEncerradas: IVaga[] = [];
  idUsuario = 1;
  private idAreaAtuacaoUsuario: number = 2;

  vagasPublicas: IVaga[] = [];

  public vagasRecomendadas: IVaga[] = [];
  public vagasAgrupadasPorArea: GrupoDeVagas[] = [];

  areasAtuacao: IAreasAtuacao[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vagasService: VagasService,
    private dialog: MatDialog,
    private areasService: AreasAtuacaoService
  ) {}

  ngOnInit(): void {
    this.getVagas();
    this.onListAreasAtuacao();
    console.log(this.vagasOfertadas);
    console.log(this.vagasEncerradas);
  }

  navegarParaDetalhe(vaga: IVaga) {
    if (vaga?.id_vagas) {
      this.router.navigate(['/detalhe-da-vaga', vaga.id_vagas]);
    }
  }

  public getVagas() {
    return this.vagasService.httpListVagas$().subscribe({
      next: (data) => {
        console.log(data);
        this.processarEAgruparVagas(data);
        this.vagasOfertadas = data.filter(
          (vaga) =>
            vaga.id_empresas === this.idUsuario &&
            (vaga.status === EStatusVaga.EM_ANDAMENTO ||
              vaga.status === EStatusVaga.INATIVO)
        );
        this.vagasEncerradas = data.filter(
          (vaga) =>
            vaga.id_empresas === this.idUsuario &&
            vaga.status === EStatusVaga.FINALIZADO
        );
      },
      error: (error) => {
        console.error('Erro ao buscar vagas:', error);
      },
    });
  }

  onListAreasAtuacao() {
    return this.areasService.httpListAreas$().subscribe({
      next: (response) => {
        console.log(response);
        this.areasAtuacao = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  private processarEAgruparVagas(todasAsVagas: IVaga[]): void {
    this.vagasRecomendadas = todasAsVagas.filter(
      (vaga) =>
        vaga.area_atuacao?.id_areas_atuacao === this.idAreaAtuacaoUsuario
    );

    const vagasRestantes = todasAsVagas.filter(
      (vaga) =>
        vaga.area_atuacao?.id_areas_atuacao !== this.idAreaAtuacaoUsuario
    );

    const mapaDeGrupos = new Map<number, GrupoDeVagas>();

    for (const vaga of vagasRestantes) {
      if (!vaga.area_atuacao) continue;

      const areaId = vaga.area_atuacao.id_areas_atuacao;

      if (!mapaDeGrupos.has(areaId)) {
        mapaDeGrupos.set(areaId, {
          area: vaga.area_atuacao,
          vagas: [],
        });
      }

      mapaDeGrupos.get(areaId)!.vagas.push(vaga);
    }

    this.vagasAgrupadasPorArea = Array.from(mapaDeGrupos.values());
  }
}
