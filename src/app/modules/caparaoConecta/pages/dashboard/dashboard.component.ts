import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { TabelaComponent } from './dashboard-tabela/dashboard-tabela.component';
import { GraficoComponent } from '../../components/grafico/grafico.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { VagasService } from '../../../../services/vaga/vagas.service';
import { AuthService } from '../../../../services/auth-caparao/login.service';
import { ERoleUser } from '../../enum/ERoleUser.enum';
import { IVaga } from '../../interface/IVaga.interface';
import { EStatusVaga } from '../../enum/EStatusVaga.enum';

@Component({
  selector: 'app-dashboard',
  imports: [
    CabecalhoComponent,
    DashboardCardComponent,
    TabelaComponent,
    GraficoComponent,
    FooterComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  public vagas = signal<IVaga[]>([]);

  private vagasService = inject(VagasService);
  private userAuth = inject(AuthService);

  public user = this.userAuth.currentUser;

  public role = computed(() => {
    const roleName = this.user()?.tipo_usuario?.nome;
    return (roleName as ERoleUser) || ERoleUser.GUEST;
  });

  constructor() {}

  ngOnInit(): void {
    this.getVagas();
    console.log(this.vagas());
  }

  public getVagas() {
    return this.vagasService.httpListVagas$().subscribe({
      next: (vagas) => {
        this.vagas.set(vagas);
        console.log(this.vagas());
      },
      error: (error) => {
        console.error('Error fetching vagas:', error);
      },
    });
  }

  public vagasDaEmpresa = computed(() => {
    const user = this.user();
    if (this.role() !== ERoleUser.EMPRESA || !user) return [];
    return this.vagas().filter(
      (vaga) =>
        vaga.id_empresas === user.id_pessoas &&
        (vaga.status === EStatusVaga.EM_ANDAMENTO ||
          vaga.status === EStatusVaga.INATIVO)
    );
  });

  public totalCandidatos = computed(() => {
    const vagas = this.vagasDaEmpresa();
    return vagas.reduce(
      (total, vaga) => total + (vaga.candidato?.length || 0),
      0
    );
  });
}
