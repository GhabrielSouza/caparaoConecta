import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Carousel } from 'primeng/carousel';
import { Tag } from 'primeng/tag';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';


@Component({
  selector: 'app-component-container-vagas',
  imports: [RouterModule,CommonModule, ButtonModule, PaginatorModule],
  templateUrl: './component-container-vagas.component.html',
  styleUrl: './component-container-vagas.component.scss'
})
export class ComponentContainerVagasComponent {

  first: number = 0;

  rows: number = 10;

  onPageChange(event: PaginatorState) {
      this.first = event.first ?? 0;
      this.rows = event.rows ?? 10;
  }

  @Input() titulo: string = '';

  constructor(public router:Router){}

  navigateCandidatoLogin(){
    this.router.navigate(['/login']);
  }
}
