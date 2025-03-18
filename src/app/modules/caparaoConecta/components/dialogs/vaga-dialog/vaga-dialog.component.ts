import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-vaga-dialog',
  imports: [],
  templateUrl: './vaga-dialog.component.html',
  styleUrl: './vaga-dialog.component.scss'
})
export class VagaDialogComponent {
  @Input() public botaoCandidatar: string = '';
  @Input() public botaoSair: string = '';

  favoritar:boolean = false;

  constructor(private _dialogRef:MatDialogRef<VagaDialogComponent>, 
        @Inject(MAT_DIALOG_DATA) public data:string, private router: Router){}
    
  public closeModal():void{
    this._dialogRef.close();
  }

  public favoritarVaga(){
    this.favoritar = !this.favoritar;
  }
}
