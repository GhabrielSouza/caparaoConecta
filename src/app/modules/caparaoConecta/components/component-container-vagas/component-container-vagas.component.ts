import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Carousel } from 'primeng/carousel';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-component-container-vagas',
  imports: [RouterModule,CommonModule, Carousel, ButtonModule, Tag],
  templateUrl: './component-container-vagas.component.html',
  styleUrl: './component-container-vagas.component.scss'
})
export class ComponentContainerVagasComponent {

  constructor(public router:Router){}

  navigateCandidatoLogin(){
    this.router.navigate(['/login']);
  }
}
