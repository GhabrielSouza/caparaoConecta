import { Component, Inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-select-register-dialog',
  imports: [MatButtonModule,MatDialogContent, RouterModule],
  templateUrl: './select-register-dialog.component.html',
  styleUrl: './select-register-dialog.component.scss'
})
export class SelectRegisterDialogComponent {

  constructor(private _dialogRef:MatDialogRef<SelectRegisterDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:string, private router: Router){}

  @Input() public title:string = '';  

  public closeModal():void{
    this._dialogRef.close();
  }

  navigateCandidato(){
    this._dialogRef.close();
    this.router.navigate(['/singUp']);
  }

  navigateEmpresa(){
    this._dialogRef.close();
    this.router.navigate(['/singUpEnterprise']);
  }
}
