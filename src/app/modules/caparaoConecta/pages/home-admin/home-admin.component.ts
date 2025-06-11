import { Component } from '@angular/core';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { DashboardCardComponent } from '../dashboard/dashboard-card/dashboard-card.component';
import { CardVagaComponent } from '../../components/cards/card-vaga/card-vaga.component';

@Component({
  selector: 'app-home-admin',
  imports: [CabecalhoComponent, FooterComponent, DashboardCardComponent,],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.scss'
})
export class HomeAdminComponent {

}
