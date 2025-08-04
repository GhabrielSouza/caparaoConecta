import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal'; // Importação importante!

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ButtonPrimaryComponent } from '../buttons/button-primary/button-primary.component';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { ITableColumn } from '../../interface/ITableColumn.interface';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatPaginator, ButtonPrimaryComponent, CapitalizePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent<T> {
  @Input() title: string = '';
  @Input() addLabel: string = 'Adicionar Item';
  @Input() data: T[] = [];

  @Input() columns: ITableColumn<T>[] = [];

  @Input() dialogComponent!: ComponentType<any>;

  @Input() idFn: (item: T) => number = (item: any) => item.id;
  @Input() displayFn: (item: T) => string = (item: any) => item.nome;
  @Input() statusFn: (item: T) => string = (item: any) => item.status;

  @Output() itemAdded = new EventEmitter<T>();
  @Output() itemEdited = new EventEmitter<T>();
  @Output() itemDeleted = new EventEmitter<number>();
  @Output() itemStatusToggled = new EventEmitter<T>();

  @Input() totalDataLength: number = 0;

  @Output() pageChanged = new EventEmitter<PageEvent>();

  constructor(private dialog: MatDialog) {}

  public getCellValue(item: T, column: ITableColumn<T>): any {
    if (column.cell) {
      return column.cell(item);
    }

    return (item as any)[column.key];
  }

  openItemDialog(item?: T): void {
    if (!this.dialogComponent) {
      console.error(
        'Erro: Nenhum dialogComponent foi fornecido para a tabela.'
      );
      return;
    }

    const dialogRef = this.dialog.open(this.dialogComponent, {
      width: '400px',
      data: { item },
    });

    dialogRef.afterClosed().subscribe((result: T) => {
      if (result) {
        if (item) {
          this.itemEdited.emit(result);
        } else {
          this.itemAdded.emit(result);
        }
      }
    });
  }

  onDeleteItem(item: T): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmar Exclusão',
        message: `Tem certeza que deseja excluir o item "${this.displayFn(
          item
        )}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.itemDeleted.emit(this.idFn(item));
      }
    });
  }

  onToggleStatus(item: T): void {
    this.itemStatusToggled.emit(item);
  }

  public onPageChange(event: PageEvent): void {
    this.pageChanged.emit(event);
  }
}
