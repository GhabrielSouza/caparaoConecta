import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { PaginatorState, Paginator } from 'primeng/paginator';
import { IVaga } from '../../../interface/IVaga.interface';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';

@Component({
  selector: 'app-card-vaga-favorita',
  imports: [Paginator, CommonModule, CapitalizePipe],
  templateUrl: './card-vaga-favorita.component.html',
  styleUrl: './card-vaga-favorita.component.scss',
})
export class CardVagaFavoritaComponent implements OnInit {
  @Input() public imagem: string = 'assets/imgs/semFoto.jpg';
  @Input() vagas: IVaga[] = [];

  currentPage: number = 0;
  pageSize: number = 4;

  get paginatedVagas(): IVaga[] {
    const start = this.currentPage * this.pageSize;
    return this.vagas.slice(start, start + this.pageSize);
  }

  onPageChange(event: PaginatorState) {
    this.currentPage = event.page ?? 0;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    const screenWidth = window.innerWidth;

    if (screenWidth < 768) {
      // Telas de celular
      this.pageSize = 1;
    } else if (screenWidth < 1200) {
      // Telas de tablet
      this.pageSize = 2;
    } else {
      // Telas de desktop
      this.pageSize = 4;
    }
  }

  @Output() vagaClicada = new EventEmitter<IVaga>();

  onCardClick(vaga: IVaga) {
    this.vagaClicada.emit(vaga);
  }
}
