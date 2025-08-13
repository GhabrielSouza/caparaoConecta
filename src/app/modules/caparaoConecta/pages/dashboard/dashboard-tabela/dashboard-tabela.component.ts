import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  Input,
  ViewChild,
  AfterViewInit,
  SimpleChanges,
  OnChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { IVaga } from '../../../interface/IVaga.interface';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import { ComponentType } from '@angular/cdk/portal';
import { ConfirmationDialogComponent } from '../../../components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { ITableColumn } from '../../../interface/ITableColumn.interface';

@Component({
  imports: [
    MatTableModule,
    RouterModule,
    MatPaginatorModule,
    MatDialogModule,
    CommonModule,
    CapitalizePipe,
  ],
  templateUrl: 'dashboard-tabela.component.html',
  styleUrls: ['dashboard-tabela.component.scss'],
  selector: 'app-dashboard-tabela',
  standalone: true,
})
export class TabelaComponent<T> {
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

  public onPageChange(event: PageEvent): void {
    this.pageChanged.emit(event);
  }
}
