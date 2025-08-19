import {
  Component,
  EventEmitter,
  inject,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IVaga } from '../../../interface/IVaga.interface';
import { MatIcon } from '@angular/material/icon';
import { MatChipListbox, MatChip } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import { AuthService } from '../../../../../services/auth-caparao/login.service';
import { VagasService } from '../../../../../services/vaga/vagas.service';
import { ERoleUser } from '../../../enum/ERoleUser.enum';

@Component({
  selector: 'app-vaga-dialog',
  imports: [
    MatIcon,
    MatDialogContent,
    MatChipListbox,
    MatChip,
    MatDialogActions,
    CommonModule,
    CapitalizePipe,
  ],
  templateUrl: './vaga-dialog.component.html',
  styleUrl: './vaga-dialog.component.scss',
})
export class VagaDialogComponent implements OnInit {
  @Input() public imagem: string = 'assets/imgs/semFoto.jpg';

  favoritar: boolean = false;

  private vagasService = inject(VagasService);
  private authService = inject(AuthService);
  private user = this.authService.currentUser;

  constructor(
    private _dialogRef: MatDialogRef<VagaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {
    console.log(data);
  }

  ngOnInit(): void {
    this.favoritar = this.data.vaga.is_favorita;
    this.registrarVisualizacao();
  }

  public closeModal(): void {
    this._dialogRef.close();
  }

  public favoritarVaga() {
    this.favoritar = !this.favoritar;

    this.vagasService.httpToggleFavorito$(this.data.vaga.id_vagas).subscribe({
      error: (error) => {
        this.favoritar = !this.favoritar;
        console.log(error);
      },
    });
  }

  public candidatarUser() {
    this._dialogRef.close(this.data.vaga.id_vagas);
  }

  private registrarVisualizacao(): void {
    const currentUser = this.user();
    const vagaId = this.data.vaga.id_vagas;

    console.log('Registrando visualização da vaga:', vagaId);

    if (
      currentUser &&
      currentUser.tipo_usuario?.nome === ERoleUser.CANDIDATO &&
      vagaId
    ) {
      this.vagasService.httpRegistrarVisualizacaoVaga$(vagaId).subscribe({
        next: (res) =>
          console.log('Notificação de visualização (dialog):', res),
        error: (err) =>
          console.error('Erro ao notificar visualização (dialog):', err),
      });
    }
  }
}
