import { EStatusVaga } from './../../enum/EStatusVaga.enum';
import { Component, Input, OnInit } from '@angular/core';
import { ERoleUser } from '../../enum/ERoleUser.enum';
import { ButtonPrimaryComponent } from '../buttons/button-primary/button-primary.component';
import { CommonModule, Location } from '@angular/common';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { DashboardCardComponent } from '../../pages/dashboard/dashboard-card/dashboard-card.component';
import { ComponentAccordionComponent } from '../component-accordion/component-accordion.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';
import { CandidatoSelecionadoComponent } from '../candidato-selecionado/candidato-selecionado.component';
import { CursosSService } from '../../../../services/cursos/cursos-s.service';
import { VagasService } from '../../../../services/vagas.service';
import { ActivatedRoute } from '@angular/router';
import { IVaga } from '../../interface/IVaga.interface';
import { MatDialog } from '@angular/material/dialog';
import { CadastroVagaDialogComponent } from '../dialogs/cadastro-vaga-dialog/cadastro-vaga-dialog.component';
import { EDialogEnum } from '../../enum/EDialogEnum.enum';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-detalhes-vaga',
  imports: [
    ButtonPrimaryComponent,
    CommonModule,
    MatCheckboxModule,
    DashboardCardComponent,
    MatRadioModule,
    ComponentAccordionComponent,
    MatChipsModule,
    CandidatoSelecionadoComponent,
  ],
  templateUrl: './detalhes-vaga.component.html',
  styleUrl: './detalhes-vaga.component.scss',
})
export class DetalhesVagaComponent implements OnInit {
  containerFooter: boolean = true;
  visaoCandidato: boolean = true;

  visaoDetalhes: boolean = true;
  visaoEstatistica: boolean = false;

  public role: ERoleUser | null = ERoleUser.EMPRESA;
  public roleEnum = ERoleUser;

  public statusVagaEnum = EStatusVaga;

  nomeVaga: string = 'Desenvolvedor Web JR';
  nomeCandidato: string = 'Lucas Silva';
  habilidades: any[] = [];

  @Input() vaga!: IVaga;
  @Input() IdUsuario: any;

  constructor(
    private location: Location,
    private vagaService: VagasService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  alterarImagemDetalhes: boolean = true;
  alterarImagemEstatistica: boolean = false;
  alterarBackground: boolean = true;
  alterarCorFonteDetalhes: boolean = true;
  alterarCorFonteEstatistica: boolean = false;

  public alterarDetalhes() {
    if (!this.alterarImagemDetalhes) {
      this.alterarImagemDetalhes = true;
      this.alterarImagemEstatistica = false;
      this.alterarBackground = true;
      this.alterarCorFonteDetalhes = true;
      this.alterarCorFonteEstatistica = false;
      this.visaoDetalhes = true;
      this.visaoEstatistica = false;
    }
  }

  public alterarEstatistica() {
    if (!this.alterarImagemEstatistica) {
      this.alterarImagemDetalhes = false;
      this.alterarImagemEstatistica = true;
      this.alterarBackground = false;
      this.alterarCorFonteDetalhes = false;
      this.alterarCorFonteEstatistica = true;
      this.visaoDetalhes = false;
      this.visaoEstatistica = true;
    }
  }

  voltar() {
    this.location.back();
  }

  ngOnInit(): void {}

  // public getVagaId() {
  //   const vagaIdString = this.route.snapshot.paramMap.get('id');

  //   console.log(vagaIdString);

  //   if (vagaIdString) {
  //     const vagaId = +vagaIdString;

  //     this.vagaService.httpListVagasId$(vagaId).subscribe({
  //       next: (data) => {
  //         console.log(data);
  //         this.vaga = data;
  //       },
  //       error: (error) => {
  //         console.error('Erro ao buscar vaga:', error);
  //       },
  //     });
  //   } else {
  //     console.error('ID da vaga não encontrado na URL!');
  //   }
  // }

  public finalizarVaga() {
    const vagaIdString = this.route.snapshot.paramMap.get('id');
    console.log(vagaIdString);

    const status = 'FINALIZADO';

    if (vagaIdString) {
      const vagaId = +vagaIdString;
      this.vagaService.httpFinalizarVaga$(vagaId, status).subscribe({
        next: (response) => {
          console.log('Vaga finalizada com sucesso:', response);
          this.location.back();
        },
        error: (error) => {
          console.error('Erro ao finalizar vaga:', error);
        },
      });
    }
  }

  public deletarVaga() {
    const vagaIdString = this.route.snapshot.paramMap.get('id');
    console.log(vagaIdString);

    const status = 'FINALIZADO';

    if (vagaIdString) {
      const vagaId = +vagaIdString;
      this.vagaService.httpDeleteVaga$(vagaId).subscribe({
        next: (response) => {
          console.log('Vaga excluida com sucesso:', response);
          this.location.back();
        },
        error: (error) => {
          console.error('Erro ao excluir vaga:', error);
        },
      });
    }
  }

  public editarVaga() {
    this.dialog.open(CadastroVagaDialogComponent, {
      panelClass: EDialogEnum.PROJETOS,
      data: {
        conteudoVaga: this.vaga,
        id: this.IdUsuario,
      },
    });
  }

  confirmDelete(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmar exclusão',
        message: `Tem certeza que deseja excluir a vaga?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deletarVaga();
      }
    });
  }
}
