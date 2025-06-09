import { Component, Inject, signal } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent,  } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HabilidadesSService } from '../../../../../services/habilidades/habilidades-s.service';
import { IHabilidades } from '../../../interface/IHabilidades.interface';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ButtonPrimaryComponent } from "../../buttons/button-primary/button-primary.component";

@Component({
  selector: 'app-dialog-habilidades',
  standalone: true,
  imports: [MatCheckboxModule, CommonModule, MatButtonModule, MatDialogContent, ButtonPrimaryComponent],
  templateUrl: './dialog-habilidades.component.html',
  styleUrls: ['./dialog-habilidades.component.scss']
})
export class DialogHabilidadesComponent {
  allHabilidades = signal<IHabilidades[]>([]);
  selectedHabilidades = signal<number[]>([]);

  constructor(
    private _dialogRef: MatDialogRef<DialogHabilidadesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private habilidadesService: HabilidadesSService
  ) {
    console.log(data.habilidades)
    if (data.habilidades) {
      this.selectedHabilidades.set(data.habilidades.map((h: IHabilidades) => h.id_habilidades));
    }
  }

  ngOnInit() {
    this.loadHabilidades();
  }

  loadHabilidades() {
    this.habilidadesService.httpListHabilidades$().subscribe({
      next: (data) => this.allHabilidades.set(data),
      error: (error) => console.error('Erro ao carregar habilidades', error)
    });
  }

  toggleHabilidade(id: number) {
    this.selectedHabilidades.update(ids => {
      if (ids.includes(id)) {
        return ids.filter(i => i !== id);
      } else {
        return [...ids, id];
      }
    });
  }

  submit() {
    const payload = {
      id_pessoasFisicas: this.data.id,
      id_habilidades: this.selectedHabilidades()
    };

    console.log('Payload enviado:', payload);

    this.habilidadesService.httpCreateHabilidadesOnPessoas$(payload).subscribe({
      next: () => this._dialogRef.close(true),
      error: (error) => console.error('Erro ao salvar habilidades', error)
    });
  }

  closeModal() {
    this._dialogRef.close();
  }
}