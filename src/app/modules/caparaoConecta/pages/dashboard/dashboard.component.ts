import { Component } from '@angular/core';
import { CabecalhoComponent } from "../../components/cabecalho/cabecalho.component";
import { DashboardCardComponent } from "./dashboard-card/dashboard-card.component";
import { DashboardTabelaComponent } from "./dashboard-tabela/dashboard-tabela.component";

@Component({
  selector: 'app-dashboard',
  imports: [CabecalhoComponent, DashboardCardComponent, DashboardTabelaComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
