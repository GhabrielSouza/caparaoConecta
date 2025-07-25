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
import { VagasService } from '../../../../services/vagas.service';
import { ContentObserver } from '@angular/cdk/observers';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogHabilidadesAdminComponent } from '../../components/dialogs/dialog-habilidades-admin/dialog-habilidades-admin.component';
import { EDialogEnum } from '../../enum/EDialogEnum.enum';
import { DialogCursosAdminComponent } from '../../components/dialogs/dialog-cursos-admin/dialog-cursos-admin.component';
import { HomeAdminComponent } from '../home-admin/home-admin.component';

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
  public role: ERoleUser | null = ERoleUser.EMPRESA;
  public roleEnum = ERoleUser;

  vagasOfertadas: IVaga[] = [];
  vagasEncerradas: IVaga[] = [];
  idUsuario = 2;

  vagasPublicas: IVaga[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vagasService: VagasService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getVagas();
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
        this.vagasPublicas = data;

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
}
