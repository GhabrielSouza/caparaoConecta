import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginatorState, Paginator } from 'primeng/paginator';
import { IVaga } from '../../../interface/IVaga.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-vaga-favorita',
  imports: [Paginator, CommonModule],
  templateUrl: './card-vaga-favorita.component.html',
  styleUrl: './card-vaga-favorita.component.scss',
})
export class CardVagaFavoritaComponent {
  @Input() public imagem: string = 'assets/imgs/semFoto.jpg';
  @Input() vagas: IVaga[] = [];

  currentPage: number = 0;
  pageSize: number = 3;

  get paginatedVagas(): IVaga[] {
    const start = this.currentPage * this.pageSize;
    return this.vagas.slice(start, start + this.pageSize);
  }

  onPageChange(event: PaginatorState) {
    this.currentPage = event.page ?? 0;
  }

  @Output() vagaClicada = new EventEmitter<IVaga>();

  onCardClick(vaga: IVaga) {
    this.vagaClicada.emit(vaga);
  }
}
