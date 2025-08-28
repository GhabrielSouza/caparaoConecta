import { Component, Input } from '@angular/core';
import { IPessoa } from '../../../interface/IPessoa.interface';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-card-perfil',
  imports: [Paginator, CommonModule],
  templateUrl: './card-perfil.component.html',
  styleUrl: './card-perfil.component.scss',
})
export class CardPerfilComponent {
  @Input() pessoas: IPessoa[] | null = [];
  @Input() pagineteVagas: IPessoa[] = [];

  currentPage: number = 0;
  pageSize: number = 4;

  get paginatedVagas(): IPessoa[] {
    const start = this.currentPage * this.pageSize;
    return this.pessoas!.slice(start, start + this.pageSize) ?? [];
  }

  onPageChange(event: PaginatorState) {
    this.currentPage = event.page ?? 0;
  }
}
