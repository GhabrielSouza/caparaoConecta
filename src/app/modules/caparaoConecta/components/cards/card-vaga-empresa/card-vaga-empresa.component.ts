import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { IVagas } from '../../../interface/IVagas.interface';
import { IVaga } from '../../../interface/IVaga.interface';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';

@Component({
  selector: 'app-card-vaga-empresa',
  standalone: true,
  imports: [CommonModule, PaginatorModule, CapitalizePipe],
  templateUrl: './card-vaga-empresa.component.html',
  styleUrl: './card-vaga-empresa.component.scss',
})
export class CardVagaEmpresaComponent implements OnInit {
  @Input() public imagem: string = 'assets/imgs/semFoto.jpg';
  @Input() vagas: IVaga[] = [];

  currentPage: number = 0;
  pageSize: number = 4;

  get paginatedVagas(): IVaga[] {
    const start = this.currentPage * this.pageSize;
    return this.vagas.slice(start, start + this.pageSize);
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

  onPageChange(event: PaginatorState) {
    this.currentPage = event.page ?? 0;
  }

  @Output() vagaClicada = new EventEmitter<IVaga>();

  onCardClick(vaga: IVaga) {
    this.vagaClicada.emit(vaga);
  }
}
