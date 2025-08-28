import { NgModel } from '@angular/forms';
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { CardPerfilComponent } from '../../components/cards/card-perfil/card-perfil.component';
import { IPessoa } from '../../interface/IPessoa.interface';
import { MatPaginator } from '@angular/material/paginator';
import { RegisterService } from '../../../../services/register-caparao/register.service';
import { Paginator, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-page-pesquisa',
  imports: [FooterComponent, CabecalhoComponent, CardPerfilComponent],
  templateUrl: './page-pesquisa.component.html',
  styleUrl: './page-pesquisa.component.scss',
})
export class PagePesquisaComponent implements OnInit {
  private pessoasService = inject(RegisterService);

  @Input() pessoas = this.pessoasService.getListUsuarios;

  ngOnInit(): void {
    this.getUsuarios();
  }

  public getUsuarios() {
    return this.pessoasService.httpListPessoas$().subscribe();
  }

  currentPage: number = 0;
  pageSize: number = 3;

  get paginatedVagas(): IPessoa[] {
    const start = this.currentPage * this.pageSize;
    return this.pessoas()!.slice(start, start + this.pageSize) ?? [];
  }

  onPageChange(event: PaginatorState) {
    this.currentPage = event.page ?? 0;
  }
}
