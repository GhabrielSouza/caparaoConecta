import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  imports:[MatTableModule, RouterModule, MatPaginatorModule, MatDialogModule],
  templateUrl: 'dashboard-tabela.component.html',
  styleUrls: ['dashboard-tabela.component.scss'],
  selector: 'app-dashboard-tabela',
  standalone: true
})
export class TabelaComponent<T> implements AfterViewInit {
  @Input() dataSource: MatTableDataSource<T> = new MatTableDataSource<T>([]);
  @Input() pageSizeOptions: number[] = [10, 20];
  @Input() displayedColumns?: string[];
  @Input() customTemplates: {[key: string]: (element: T) => string} = {};
  aceitosStatus: boolean = true; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog) {
    const dadosTeste = [
      {
        "nomeVaga": "Web Developer",
        "statusVaga": "Ativo",
        "dataEncerramento": "12/12/2025",
        "candidatosAceitos": 1,
        "qtdCandidatos": 10,
      },{
        "nomeVaga": "Web Developer",
        "statusVaga": "Ativo",
        "dataEncerramento": "12/12/2025",
        "candidatosAceitos": 1,
        "qtdCandidatos": 10,
      },{
        "nomeVaga": "Web Developer",
        "statusVaga": "Ativo",
        "dataEncerramento": "12/12/2025",
        "candidatosAceitos": 1,
        "qtdCandidatos": 10,
      },{
        "nomeVaga": "Web Developer",
        "statusVaga": "Ativo",
        "dataEncerramento": "12/12/2025",
        "candidatosAceitos": 1,
        "qtdCandidatos": 10,
      },{
        "nomeVaga": "Web Developer",
        "statusVaga": "Ativo",
        "dataEncerramento": "12/12/2025",
        "candidatosAceitos": 1,
        "qtdCandidatos": 10,
      },{
        "nomeVaga": "Web Developer",
        "statusVaga": "Ativo",
        "dataEncerramento": "12/12/2025",
        "candidatosAceitos": 1,
        "qtdCandidatos": 10,
      },
      {
        "nomeVaga": "Web Developer",
        "statusVaga": "Ativo",
        "dataEncerramento": "12/12/2025",
        "candidatosAceitos": 1,
        "qtdCandidatos": 10,
      },
    ];

    this.dataSource = new MatTableDataSource<T>(dadosTeste as T[]);
    this.displayedColumns = ['nomeVaga', 'statusVaga', 'dataEncerramento', 'candidatosAceitos','qtdCandidatos'];
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }
}