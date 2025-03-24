import { Component, Inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogActions, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { SelectRegisterDialogComponent } from '../select-register-dialog/select-register-dialog.component';
import { PrimaryInputComponent } from '../../inputs/primary-input/primary-input.component';
import { DateInputComponent } from '../../inputs/date-input/date-input.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-form-experiencia-profissional',
  imports: [MatButtonModule,MatDialogContent, MatDialogActions, RouterModule, PrimaryInputComponent, DateInputComponent, MatFormFieldModule, MatRadioModule ],
  templateUrl: './form-experiencia-profissional.component.html',
  styleUrl: './form-experiencia-profissional.component.scss', 
  standalone: true,
})
export class FormExperienciaProfissionalComponent {
 constructor(private _dialogRef:MatDialogRef<SelectRegisterDialogComponent>, 
     @Inject(MAT_DIALOG_DATA) public data:string, private router: Router){}
 
  public closeModal(){
    this._dialogRef.close();
  }

}


