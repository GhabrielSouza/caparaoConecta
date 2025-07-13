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
import { IPessoa } from '../../interface/IPessoa.interface';
import { IPessoaFisica } from '../../interface/IPessoaFisica.interface';
import { IHabilidades } from '../../interface/IHabilidades.interface';
import { ICursos } from '../../interface/ICursos.inteface';
import { FormsModule, NgModel } from '@angular/forms';

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
    FormsModule,
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

  habilidades: any[] = [];

  @Input() vaga!: IVaga;
  @Input() candidaturas: IPessoaFisica[] = [];
  @Input() IdUsuario: any;

  public habilidadesFaltantes: IHabilidades[] = [];
  public cursosFaltantes: ICursos[] = [];

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

  ngOnInit(): void {
    this.getCandidaturas();
    this.getCompetenciasFaltantes();
  }

  public getCandidaturas() {
    const vagaIdString = this.route.snapshot.paramMap.get('id');

    if (vagaIdString) {
      const vagaId = +vagaIdString;

      this.vagaService.httpListCandidaturas$(vagaId).subscribe({
        next: (data) => {
          console.log(data);
          this.candidaturas = data;
        },
        error: (error) => {
          console.error('Erro ao buscar vaga:', error);
        },
      });
    } else {
      console.error('ID da vaga não encontrado na URL!');
    }
  }

  private getCompetenciasFaltantes() {
    this.candidaturas.forEach((candidato: IPessoaFisica) => {
      if (!this.vaga?.habilidades || !candidato?.pessoa.habilidades) {
        return;
      }

      const idsHabilidadesDoCandidato = new Set(
        candidato.pessoa.habilidades.map((h) => h.id_habilidades)
      );

      const idsCursosDoCandidato = new Set(
        candidato.pessoa.cursos.map((c) => c.id_cursos)
      );

      this.habilidadesFaltantes = this.vaga.habilidades.filter(
        (habilidadeDaVaga) =>
          !idsHabilidadesDoCandidato.has(habilidadeDaVaga.id_habilidades)
      );

      this.cursosFaltantes = this.vaga.curso.filter(
        (cursoDaVaga) => !idsCursosDoCandidato.has(cursoDaVaga.id_cursos)
      );
    });
  }

  public atualizarStatusDeContratacao(candidato: IPessoaFisica) {
    const vagaIdString = this.route.snapshot.paramMap.get('id');
    const candidatoId = candidato.id_pessoas;
    const status = candidato.pivot.status;

    if (vagaIdString) {
      const vagaId = +vagaIdString;
      this.vagaService
        .httpAtualizarStatusCandidato$(vagaId, candidatoId, status)
        .subscribe({
          next: (response) => {
            console.log('Status atualizado com sucesso:', response);
            this.getCandidaturas();
          },
          error: (error) => {
            console.error('Erro ao atualizar status:', error);
          },
        });
    }
  }

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

  private executarProrrogacao(): void {
    const vagaId = this.vaga.id_vagas;
    const dataFechamentoString = this.vaga.data_fechamento;

    if (!dataFechamentoString) {
      console.error('Data de fechamento da vaga não está definida.');
      return;
    }

    const dataAtual = new Date(dataFechamentoString);

    const data_fechamento = new Date(dataAtual);
    data_fechamento.setDate(dataAtual.getDate() + 5);

    this.vagaService.httpProrrogarVaga$(vagaId, data_fechamento).subscribe({
      next: () => {
        console.log('Vaga prorrogada com sucesso!');
      },
      error: (err) => {
        console.error('Falha ao prorrogar vaga', err);
      },
    });
  }

  public editarVaga() {
    const vagaIdString = this.route.snapshot.paramMap.get('id');
    this.dialog.open(CadastroVagaDialogComponent, {
      panelClass: EDialogEnum.PROJETOS,
      data: {
        conteudoVaga: this.vaga,
        id: this.IdUsuario,
        idVaga: vagaIdString ? +vagaIdString : null,
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

  confirmFinalizarVaga(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmar finalização',
        message: `Tem certeza que deseja finalizar a vaga?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.finalizarVaga();
      }
    });
  }

  confirmProrrogarVaga(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmar Ação',
        message: `Você tem certeza que deseja prorrogar esta vaga por mais 5 dias?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.executarProrrogacao();
      }
    });
  }
}
