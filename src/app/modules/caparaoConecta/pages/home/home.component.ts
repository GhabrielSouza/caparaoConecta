import { Component } from '@angular/core';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ComponentContainerVagasComponent } from '../../components/component-container-vagas/component-container-vagas.component';
import { CardVagaComponent } from '../../components/card-vaga/card-vaga.component';

@Component({
  selector: 'app-home',
  imports: [CabecalhoComponent, FooterComponent, ComponentContainerVagasComponent, CardVagaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
