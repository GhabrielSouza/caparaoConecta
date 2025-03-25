import { Component, Inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogActions, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { SelectRegisterDialogComponent } from '../select-register-dialog/select-register-dialog.component';
import { PrimaryInputComponent } from '../../inputs/primary-input/primary-input.component';
import { DateInputComponent } from '../../inputs/date-input/date-input.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-form-experiencia-profissional',
  imports: [MatButtonModule,MatDialogContent, MatDialogActions, RouterModule, MatCheckboxModule ,PrimaryInputComponent, DateInputComponent, MatFormFieldModule, MatRadioModule, ReactiveFormsModule ],
  templateUrl: './form-experiencia-profissional.component.html',
  styleUrl: './form-experiencia-profissional.component.scss', 
  standalone: true,
})
export class FormExperienciaProfissionalComponent {

  public formXp: FormGroup;

 constructor(private _dialogRef:MatDialogRef<SelectRegisterDialogComponent>, 
     @Inject(MAT_DIALOG_DATA) public data:string, private router: Router, private _fb:FormBuilder){
        this.formXp = this._fb.group({
          cargo: ['', [Validators.required]],
          empresa: ['', [Validators.required]], 
          dateInicio: ['', [Validators.required]],
          dateTermino: ['', [Validators.required]],
          trabalhoAtual: [false], 
          comprovacao: ['', [Validators.required]], 
          comentario: [''] 
        });
     }
 
  public closeModal(){
    this._dialogRef.close();
  }

  

}


