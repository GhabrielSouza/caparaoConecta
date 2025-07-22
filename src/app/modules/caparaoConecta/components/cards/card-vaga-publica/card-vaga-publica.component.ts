import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Carousel } from 'primeng/carousel';
import { IVagas } from '../../../interface/IVagas.interface';
import { MatDialog } from '@angular/material/dialog';
import { VagaDialogComponent } from '../../dialogs/vaga-dialog/vaga-dialog.component';
import { EDialogEnum } from '../../../enum/EDialogEnum.enum';
import { IVaga } from '../../../interface/IVaga.interface';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';

@Component({
  selector: 'app-card-vaga-publica',
  standalone: true,
  imports: [CommonModule, Carousel, CapitalizePipe],
  templateUrl: './card-vaga-publica.component.html',
  styleUrl: './card-vaga-publica.component.scss',
})
export class CardVagaPublicaComponent {
  #dialog = inject(MatDialog);

  @Input() public imagem: string = 'assets/imgs/semFoto.jpg';
  @Input() vagas: IVaga[] = [];

  public openModel(vaga: IVaga): void {
    this.#dialog.open(VagaDialogComponent, {
      panelClass: EDialogEnum.VAGA,
      data: {
        vaga: vaga,
      },
    });
  }
}
