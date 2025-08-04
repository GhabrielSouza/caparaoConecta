import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-editar-foto-usuario',
  imports: [],
  templateUrl: './dialog-editar-foto-usuario.component.html',
  styleUrl: './dialog-editar-foto-usuario.component.scss',
})
export class DialogEditarFotoUsuarioComponent {
  constructor(
    private _dialogRef: MatDialogRef<DialogEditarFotoUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private router: Router
  ) {}

  currentPhoto: string | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef;

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.currentPhoto = e.target.result;
      };
      reader.readAsDataURL(file);
      this._dialogRef.close(file);
    }
  }

  editPhoto(): void {
    this.triggerFileInput();
  }

  addPhoto(): void {
    this.triggerFileInput();
  }

  deletePhoto(): void {
    this.currentPhoto = null;
  }

  onCloseModal(): void {
    this._dialogRef.close();
  }
}
