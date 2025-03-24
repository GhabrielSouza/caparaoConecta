import { Component } from '@angular/core';
import { ComponentDefaultPerfilComponent } from '../../components/component-default-perfil/component-default-perfil.component';
import { CommonModule } from '@angular/common';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CardDefaultInformacoesComponent } from '../../components/card-default-informacoes/card-default-informacoes.component';

@Component({
  selector: 'app-perfil',
  imports: [ComponentDefaultPerfilComponent, CabecalhoComponent,FooterComponent,CardDefaultInformacoesComponent,CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {

}
