import { Component, inject, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { IVaga } from '../../../interface/IVaga.interface';
import { MatDialog } from '@angular/material/dialog';
import { VagaDialogComponent } from '../../dialogs/vaga-dialog/vaga-dialog.component';
import { EDialogEnum } from '../../../enum/EDialogEnum.enum';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { ERoleUser } from '../../../enum/ERoleUser.enum';
import { VagasService } from '../../../../../services/vaga/vagas.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-card-vaga-publica',
  standalone: true,
  imports: [CommonModule, CarouselModule, CapitalizePipe],
  templateUrl: './card-vaga-publica.component.html',
  styleUrl: './card-vaga-publica.component.scss',
})
export class CardVagaPublicaComponent {
  #dialog = inject(MatDialog);
  #router = inject(Router);
  #vagaService = inject(VagasService);

  public url = signal(environment.apiAuth);

  @Input() public imagem: string = 'assets/imgs/semFoto.jpg';
  @Input() vagas: IVaga[] = [];
  @Input() role: ERoleUser | null = ERoleUser.GUEST;

  public roleEnum = ERoleUser;

  public handleCardClick(vaga: IVaga): void {
    if (this.role === this.roleEnum.GUEST) {
      this.showAlert();
    } else {
      this.openModel(vaga);
    }
  }

  private openModel(vaga: IVaga): void {
    const dialogRef = this.#dialog.open(VagaDialogComponent, {
      panelClass: EDialogEnum.VAGA,
      data: {
        vaga: vaga,
      },
    });

    dialogRef.afterClosed().subscribe((idVaga: number) => {
      if (idVaga) {
        this.candidatarUser(idVaga);
      }
    });
  }

  public candidatarUser(vagaId: number) {
    return this.#vagaService.httpCandidatarVaga$(vagaId).subscribe({
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

  private showAlert(): void {
    Swal.fire({
      icon: 'info',
      title: 'Acesso Restrito',
      text: 'Você precisa fazer login para ver os detalhes e se candidatar a esta vaga!',
      confirmButtonText: 'Fazer Login',
      showCancelButton: true,
      confirmButtonColor: '#359830',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#ff0000',
    }).then((result) => {
      if (result.isConfirmed) {
        this.#router.navigate(['/login']);
      }
    });
  }
}
