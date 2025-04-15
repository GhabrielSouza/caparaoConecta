import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { SelectRegisterDialogComponent } from '../select-register-dialog/select-register-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { DateInputComponent } from '../../inputs/date-input/date-input.component';
import { PrimaryInputComponent } from '../../inputs/primary-input/primary-input.component';
import { ButtonPrimaryComponent } from '../../buttons/button-primary/button-primary.component';

@Component({
  selector: 'app-dialog-sobre',
  imports: [MatButtonModule,MatDialogContent, MatDialogActions, RouterModule, MatInputModule,MatCheckboxModule ,PrimaryInputComponent, DateInputComponent, MatFormFieldModule, MatRadioModule, ReactiveFormsModule, ButtonPrimaryComponent ],
  templateUrl: './dialog-sobre.component.html',
  styleUrl: './dialog-sobre.component.scss'
})
export class DialogSobreComponent {
  public form: FormGroup;
  
   constructor(private _dialogRef:MatDialogRef<SelectRegisterDialogComponent>, 
       @Inject(MAT_DIALOG_DATA) public data:string, private router: Router, private _fb:FormBuilder){
          this.form = this._fb.group({
            sobre: ['',],
          });
       }
   
    public closeModal(){
      this._dialogRef.close();
    }
}
