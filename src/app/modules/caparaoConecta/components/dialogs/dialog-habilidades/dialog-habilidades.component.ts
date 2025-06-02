import { Component, Inject , ChangeDetectionStrategy, computed, inject, model, signal} from '@angular/core';
import {  FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA,  MatDialogContent } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { SelectRegisterDialogComponent } from '../select-register-dialog/select-register-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';

import { ButtonPrimaryComponent } from '../../buttons/button-primary/button-primary.component';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormsModule} from '@angular/forms';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { HabilidadesSService } from '../../../../../services/habilidades/habilidades-s.service';
import { IHabilidades } from '../../../interface/IHabilidades.interface';

@Component({
  selector: 'app-dialog-habilidades',
  imports: [
    MatButtonModule,
    MatDialogContent, 
    RouterModule, 
    MatCheckboxModule,
    MatFormFieldModule, 
    MatRadioModule, 
    ReactiveFormsModule, 
    MatIconModule,
    MatAutocompleteModule,
    FormsModule,
    MatChipsModule,
    ButtonPrimaryComponent
   ],
  templateUrl: './dialog-habilidades.component.html',
  styleUrl: './dialog-habilidades.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogHabilidadesComponent {
  
   constructor(private _dialogRef:MatDialogRef<SelectRegisterDialogComponent>, 
       @Inject(MAT_DIALOG_DATA) public data:any, private router: Router, private _fb:FormBuilder, private habilidadesService: HabilidadesSService){


          if (data.habilidades) {
            this.habilidadesExistentes.set(data.habilidades);
            this.carregarHabilidadesExistentes();
          }

          this.getHabilidades();
       }

       readonly habilidadesExistentes = signal<IHabilidades[]>([]);
       readonly separatorKeysCodes: number[] = [ENTER, COMMA];
       readonly currentHabilidade = model('');
       readonly habilidades = signal<string[]>([]);
       readonly habilidadesIds = signal<number[]>([]);
       public allhabilidades = signal<IHabilidades[]>([]);
       public loaded = signal(false);
       readonly filteredhabilidades = computed(() => {
        if (!this.loaded()) return [];
        const currentHabilidade = this.currentHabilidade().toLowerCase();
        return currentHabilidade
          ? this.allhabilidades().filter(habilidade => habilidade.nome.toLowerCase().includes(currentHabilidade))
          : this.allhabilidades();
      });
     
       readonly announcer = inject(LiveAnnouncer);
     
       add(event: MatChipInputEvent): void {
         const value = (event.value || '').trim();
     
         // Add our fruit
         if (value) {
           this.habilidades.update(habilidades => [...habilidades, value]);
         }
     
         // Clear the input value
         this.currentHabilidade.set('');
       }
     
       remove(habilidade: string): void {
         this.habilidades.update(habilidades => {
           const index = habilidades.indexOf(habilidade);
           if (index < 0) {
             return habilidades;
           }
     
           habilidades.splice(index, 1);
           this.announcer.announce(`Removed ${habilidade}`);

           const habilidadeRemovida =  this.allhabilidades().find(h => h.nome === habilidade);
           if(habilidadeRemovida) {
            this.habilidadesIds.update(ids => ids.filter(id => id !== habilidadeRemovida!.id_habilidades));
           }

           return [...habilidades];
         });
       }
     
       selected(event: MatAutocompleteSelectedEvent): void {
        const value = event.option.viewValue;
        const selectedHabilidade = this.allhabilidades().find(h => h.nome === value);
        if (!this.habilidades().includes(value)) {
          this.habilidades.update(habilidades => [...habilidades, value]);
          this.habilidadesIds.update(ids => [...ids, selectedHabilidade!.id_habilidades]);
        }
        this.currentHabilidade.set('');
      }
      
   
    public closeModal(){
      this._dialogRef.close();
    }

    public getHabilidades(){
      return this.habilidadesService.httpListHabilidades$().subscribe({
        next: (data) =>{
          this.allhabilidades.set(data);
          this.loaded.set(true);
        },  
        error: (error) => {
          console.log(error)
          this.loaded.set(true);
        }
      })
    }

    private carregarHabilidadesExistentes() {
      const nomes = this.habilidadesExistentes().map(h => h.nome);
      const ids = this.habilidadesExistentes().map(h => h.id_habilidades);
      
      this.habilidades.set(nomes);
      this.habilidadesIds.set(ids);
    }

    public submit() {
      // Verifica se há habilidades selecionadas
      if (this.habilidadesIds().length === 0) {
        console.error('Nenhuma habilidade selecionada');
        return;
      }

      // Cria o payload com os IDs das habilidades
      const payload = {
        id_pessoasFisicas: this.data.id,
        id_habilidades: this.habilidadesIds()
      };
    
      console.log(payload)

      // Envia para o backend
      return this.habilidadesService.httpCreateHabilidadesOnPessoas$(payload).subscribe({
        next: (response) => {
          console.log('Habilidades salvas com sucesso', response);
          this._dialogRef.close(true); // Fecha o dialog e indica sucesso
        },
        error: (error) => {
          console.error('Erro ao salvar habilidades', error);
        }
      });
    }
}

