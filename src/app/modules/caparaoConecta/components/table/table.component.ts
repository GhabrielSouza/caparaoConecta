import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ButtonPrimaryComponent } from '../buttons/button-primary/button-primary.component';
import { DialogHabilidadesAdminComponent } from '../dialogs/dialog-habilidades-admin/dialog-habilidades-admin.component';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';

import { IHabilidades } from '../../interface/IHabilidades.interface';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatPaginator, ButtonPrimaryComponent, CapitalizePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() title: string = '';
  @Input() addLabel: string = 'Adicionar Item';
  @Input() data: any[] = [];
  @Input() columns: string[] = [];

  @Output() itemAdded = new EventEmitter<IHabilidades>();
  @Output() itemEdited = new EventEmitter<IHabilidades>();
  @Output() itemDeleted = new EventEmitter<number>();
  @Output() itemStatusToggled = new EventEmitter<any>();

  constructor(private dialog: MatDialog) {}

  openItemDialog(item?: IHabilidades): void {
    const dialogRef = this.dialog.open(DialogHabilidadesAdminComponent, {
      width: '400px',
      data: { item },
    });

    dialogRef.afterClosed().subscribe((result: IHabilidades) => {
      if (result) {
        if (item?.id_habilidades) {
          this.itemEdited.emit(result);
        } else {
          this.itemAdded.emit(result);
        }
      }
    });
  }

  onDeleteItem(item: IHabilidades): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmar Exclusão',
        message: `Tem certeza que deseja excluir o item "${item.nome}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.itemDeleted.emit(item.id_habilidades);
      }
    });
  }

  onToggleStatus(item: any): void {
    this.itemStatusToggled.emit(item);
  }
}
