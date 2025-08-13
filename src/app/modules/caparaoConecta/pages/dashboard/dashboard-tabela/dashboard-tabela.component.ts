import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  Input,
  ViewChild,
  AfterViewInit,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { IVaga } from '../../../interface/IVaga.interface';

@Component({
  imports: [
    MatTableModule,
    RouterModule,
    MatPaginatorModule,
    MatDialogModule,
    DatePipe,
    CommonModule,
  ],
  templateUrl: 'dashboard-tabela.component.html',
  styleUrls: ['dashboard-tabela.component.scss'],
  selector: 'app-dashboard-tabela',
  standalone: true,
})
export class TabelaComponent implements AfterViewInit, OnChanges {
  @Input() vagas: IVaga[] = [];

  displayedColumns: string[] = [
    'titulo_vaga',
    'status',
    'data_fechamento',
    'candidatos',
    'visualizacoes',
  ];

  dataSource: MatTableDataSource<IVaga> = new MatTableDataSource<IVaga>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vagas']) {
      this.dataSource.data = this.vagas;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
