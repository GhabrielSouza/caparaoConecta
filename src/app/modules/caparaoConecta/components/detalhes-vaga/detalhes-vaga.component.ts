import { EStatusVaga } from './../../enum/EStatusVaga.enum';
import {
  Component,
  computed,
  inject,
  Input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
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
import { VagasService } from '../../../../services/vaga/vagas.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
import Swal from 'sweetalert2';

interface CandidatoViewModel extends IPessoaFisica {
  habilidadesFaltantes: IHabilidades[];
  cursosFaltantes: ICursos[];
  novoStatusSelecionado: string;
}
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
    RouterLink,
  ],
  templateUrl: './detalhes-vaga.component.html',
  styleUrl: './detalhes-vaga.component.scss',
})
export class DetalhesVagaComponent implements OnChanges {
  private location = inject(Location);
  private vagaService = inject(VagasService);
  private dialog = inject(MatDialog);

  @Input() vaga!: IVaga;
  @Input() role!: ERoleUser;
  @Input() IdUsuario: any;

  public candidaturasViewModel = signal<CandidatoViewModel[]>([]);

  public roleEnum = ERoleUser;
  public statusVagaEnum = EStatusVaga;

  public visaoDetalhes = signal(true);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vaga'] && this.vaga) {
      this.prepararViewModels(this.vaga);
      console.log(this.vaga);
    }
  }

  private prepararViewModels(vaga: IVaga): void {
    if (!vaga?.candidato) {
      this.candidaturasViewModel.set([]);
      return;
    }

    const viewModels = vaga.candidato.map((candidato): CandidatoViewModel => {
      const habilidadesDoCandidato = candidato.pessoa?.habilidades || [];
      const cursosDoCandidato = candidato.pessoa?.cursos || [];

      const idsHabilidadesDoCandidato = new Set(
        habilidadesDoCandidato.map((h) => h.id_habilidades)
      );
      const idsCursosDoCandidato = new Set(
        cursosDoCandidato.map((c) => c.id_cursos)
      );

      const habilidadesDaVaga = vaga.habilidades || [];
      const cursosDaVaga = vaga.curso || [];

      const habilidadesFaltantes = habilidadesDaVaga.filter(
        (h) => !idsHabilidadesDoCandidato.has(h.id_habilidades)
      );
      const cursosFaltantes = cursosDaVaga.filter(
        (c) => !idsCursosDoCandidato.has(c.id_cursos)
      );

      return {
        ...candidato,
        habilidadesFaltantes,
        cursosFaltantes,
        novoStatusSelecionado: candidato.pivot.status,
      };
    });

    this.candidaturasViewModel.set(viewModels);
  }

  public atualizarStatusDeContratacao(candidato: CandidatoViewModel): void {
    if (candidato.novoStatusSelecionado === candidato.pivot.status) return;

    const vagaId = this.vaga!.id_vagas;
    const candidatoId = candidato.id_pessoas;
    const status = candidato.novoStatusSelecionado;

    this.vagaService
      .httpAtualizarStatusCandidato$(vagaId, candidatoId, status)
      .subscribe({
        next: (response) => {
          candidato.pivot.status = status;

          if (response.vaga.status === 'FINALIZADO') {
            this.vaga = response.vaga;
          }

          Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'O status do candidato foi atualizado.',
            timer: 1500,
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error?.message || 'Não foi possível atualizar o status.',
          });

          candidato.novoStatusSelecionado = candidato.pivot.status;
        },
      });
  }

  public alterarVisao(paraEstatistica: boolean): void {
    this.visaoDetalhes.set(!paraEstatistica);
  }

  public voltar(): void {
    this.location.back();
  }

  public candidatosContratados = computed(() => {
    return this.candidaturasViewModel().filter(
      (c) => c.pivot.status === 'Contratado'
    );
  });

  public finalizarVaga() {
    const vagaIdString = this.vaga.id_vagas;
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
    const vagaIdString = this.vaga.id_vagas;
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
    const vagaIdString = this.vaga.id_vagas;
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
