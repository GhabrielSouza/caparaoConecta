import {
  Component,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { PaginatorState, Paginator } from 'primeng/paginator';
import { IVaga } from '../../../interface/IVaga.interface';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import { MatIcon } from '@angular/material/icon';
import { VagasService } from '../../../../../services/vaga/vagas.service';
import Swal from 'sweetalert2';
import { VagaDialogComponent } from '../../dialogs/vaga-dialog/vaga-dialog.component';
import { EDialogEnum } from '../../../enum/EDialogEnum.enum';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../../../../../environments/environment';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-card-vaga-favorita',
  imports: [Paginator, CommonModule, CapitalizePipe, MatIcon],
  templateUrl: './card-vaga-favorita.component.html',
  styleUrl: './card-vaga-favorita.component.scss',
})
export class CardVagaFavoritaComponent implements OnInit {
  #dialog = inject(MatDialog);

  @Input() public imagem: string = 'assets/imgs/semFoto.jpg';
  @Input() vagas: IVaga[] | null = [];
  @Input() IsFavorita!: boolean;

  public url = signal(environment.apiAuth);

  currentPage: number = 0;
  pageSize: number = 3;

  favoritar: boolean = false;

  private vagasService = inject(VagasService);

  get paginatedVagas(): IVaga[] {
    const vagasPage = this.vagas || [];
    const start = this.currentPage * this.pageSize;
    return vagasPage.slice(start, start + this.pageSize);
  }

  onPageChange(event: PaginatorState) {
    this.currentPage = event.page ?? 0;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    const screenWidth = window.innerWidth;

    if (screenWidth < 768) {
      this.pageSize = 1;
    } else if (screenWidth < 1200) {
      this.pageSize = 2;
    } else {
      this.pageSize = 3;
    }
  }

  @Output() vagaClicada = new EventEmitter<IVaga>();

  onCardClick(vaga: IVaga) {
    this.vagaClicada.emit(vaga);
  }

  public favoritarVaga(vaga: IVaga, event: MouseEvent) {
    event?.stopPropagation();

    vaga.is_favorita = !vaga.is_favorita;

    this.vagasService.httpToggleFavorito$(vaga.id_vagas).subscribe({
      error: (error) => {
        vaga.is_favorita = !vaga.is_favorita;
      },
    });
  }

  public openModel(vaga: IVaga): void {
    const dialogRef = this.#dialog.open(VagaDialogComponent, {
      panelClass: EDialogEnum.VAGA,
      data: {
        vaga: vaga,
      },
    });

    dialogRef
      .afterClosed()
      .subscribe(
        (result: { idVaga: number; favoritar: boolean; action: string }) => {
          if (result?.idVaga && result.action === 'candidatar') {
            this.candidatarUser(result.idVaga);
          }
        }
      );
  }

  public candidatarUser(vagaId: number) {
    return this.vagasService
      .httpCandidatarVaga$(vagaId)
      .pipe(concatMap(() => this.vagasService.httpListVagas$()))
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Sua candidatura foi enviada!',
            showConfirmButton: false,
            timer: 2000,
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:
              err.error?.message ||
              'Não foi possível realizar a candidatura. Tente novamente.',
          });
        },
      });
  }
}
