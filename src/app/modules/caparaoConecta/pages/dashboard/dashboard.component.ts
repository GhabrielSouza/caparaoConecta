import { Component } from '@angular/core';
import { CabecalhoComponent } from "../../components/cabecalho/cabecalho.component";
import { DashboardCardComponent } from "./dashboard-card/dashboard-card.component";
import { TabelaComponent } from './dashboard-tabela/dashboard-tabela.component';
import { GraficoComponent } from "../../components/grafico/grafico.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-dashboard',
  imports: [CabecalhoComponent, DashboardCardComponent, TabelaComponent, GraficoComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
