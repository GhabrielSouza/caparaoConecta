import { Component, computed, Inject, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogContent,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { ButtonPrimaryComponent } from '../../buttons/button-primary/button-primary.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { VagasService } from '../../../../../services/vaga/vagas.service';
import { IVaga } from '../../../interface/IVaga.interface';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reativar-vaga',
  standalone: true,
  imports: [
    MatTableModule,
    MatDialogContent,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
    CommonModule,
    CapitalizePipe,
  ],
  templateUrl: './reativar-vaga.component.html',
  styleUrl: './reativar-vaga.component.scss',
})
export class ReativarVagaComponent implements OnInit {
  displayedColumns: string[] = [
    'selecionar',
    'id_vagas',
    'titulo_vaga',
    'modalidade_da_vaga',
    'salario',
  ];

  public vagasService = inject(VagasService);
  private snackBar = inject(MatSnackBar);

  constructor(
    private _dialogRef: MatDialogRef<ReativarVagaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private router: Router
  ) {}

  vagasFinalizadasNoComponente = computed(() => {
    const todasAsVagas = this.vagasService.getListVaga();
    return (todasAsVagas || []).filter((vaga) => vaga.status === 'FINALIZADO');
  });

  public dataSource = this.vagasFinalizadasNoComponente;

  ngOnInit(): void {
    this.vagasService.httpListVagas$().subscribe({
      next: (vagas) => {
        this.vagasService.getListVaga();
        this.dataSource = this.vagasFinalizadasNoComponente;
      },
      error: (err) => console.error('Falha ao carregar vagas no dialog:', err),
    });
  }

  public vagasSelecionadas = new Set<number>();

  toggleSelection(vaga: IVaga): void {
    const vagaId = vaga.id_vagas;

    if (this.vagasSelecionadas.has(vagaId)) {
      this.vagasSelecionadas.delete(vagaId);
    } else {
      this.vagasSelecionadas.add(vagaId);
    }

    this.dataSource = this.vagasFinalizadasNoComponente;
  }

  public salvarAlteracoes(): void {
    if (this.vagasSelecionadas.size === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'Selecione ao menos uma vaga para reativar.',
        confirmButtonText: 'Fechar',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    const idsParaAtualizar = [...this.vagasSelecionadas];
    const novoStatus = 'INATIVO';

    this.vagasService
      .atualizarStatusVagas$(idsParaAtualizar, novoStatus)
      .subscribe({
        next: (result) => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Status das vagas atualizado com sucesso!',
            confirmButtonText: 'Fechar',
            confirmButtonColor: '#3085d6',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/caparao-conecta/vagas']);
            }
          });
          this._dialogRef.close(true);
        },
        error: (err) => {
          console.error('Erro ao atualizar status:', err);
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Ocorreu um erro ao atualizar o status das vagas. Tente novamente mais tarde.',
            confirmButtonText: 'Fechar',
            confirmButtonColor: '#3085d6',
          });
        },
      });
  }

  public closeModal(): void {
    this._dialogRef.close();
  }
}
