import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
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
import { ITableColumn } from '../../interface/ITableColumn.interface';
import { PageEvent } from '@angular/material/paginator';
import { ChartModule } from 'primeng/chart';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { EmpyComponent } from '../../components/empy/empy.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    CabecalhoComponent,
    DashboardCardComponent,
    TabelaComponent,
    FooterComponent,
    ChartModule,
    CommonModule,
    EmpyComponent,
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

  public currentPage = signal(0);
  public pageSize = signal(10);

  public barChartData: any;
  public barChartOptions: any;

  public doughnutChartData: any;
  public doughnutChartOptions: any;

  constructor() {
    effect(() => {
      if (typeof window !== 'undefined' && this.vagasDaEmpresa().length > 0) {
        this.atualizarDadosDosGraficos();
      }
    });
  }

  ngOnInit(): void {
    this.getVagas();
  }

  public getVagas() {
    return this.vagasService.httpListVagas$().subscribe({
      next: (vagas) => {
        this.vagas.set(vagas);
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
          vaga.status === EStatusVaga.FINALIZADO)
    );
  });

  public paginatedVagas = computed(() => {
    const allVagas = this.vagasDaEmpresa();
    const startIndex = this.currentPage() * this.pageSize();
    const endIndex = startIndex + this.pageSize();
    return allVagas.slice(startIndex, endIndex);
  });

  public totalCandidatos = computed(() => {
    const vagas = this.vagasDaEmpresa();
    return vagas.reduce(
      (total, vaga) => total + (vaga.candidato?.length || 0),
      0
    );
  });

  VagasData: IVaga[] = [];

  public totalVagas = computed(() => this.vagasDaEmpresa().length);

  getStatusVaga = (item: IVaga) => item.status;

  vagasColumns: ITableColumn<IVaga>[] = [
    { key: 'titulo_vaga', header: 'Titulo da Vaga' },

    {
      key: 'status',
      header: 'Status',
      cell: (vaga) => {
        return vaga.status === EStatusVaga.EM_ANDAMENTO
          ? 'Em Andamento'
          : 'Finalizado';
      },
    },
    {
      key: 'candidatos',
      header: 'Candidatos',
      cell: (vaga) => vaga.candidato?.length || 0,
    },
    { key: 'visualizacoes', header: 'Visualizações' },
  ];

  public updatePaginatedData(event: PageEvent): void {
    this.currentPage.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

  public atualizarDadosDosGraficos(): void {
    const vagas = this.vagasDaEmpresa();
    if (vagas.length === 0) return;

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--p-text-muted-color'
    );
    const surfaceBorder = documentStyle.getPropertyValue(
      '--p-content-border-color'
    );

    this.barChartData = {
      labels: vagas.map((v) => v.titulo_vaga),
      datasets: [
        {
          label: 'Candidatos',
          data: vagas.map((v) => v.candidato?.length || 0),
          backgroundColor: documentStyle.getPropertyValue('--p-green-500'),
        },
      ],
    };

    const vagasEmAndamento = vagas.filter(
      (v) => v.status === EStatusVaga.EM_ANDAMENTO
    ).length;
    const vagasFinalizadas = vagas.filter(
      (v) => v.status === EStatusVaga.FINALIZADO
    ).length;

    this.doughnutChartData = {
      labels: ['Em Andamento', 'Finalizadas'],
      datasets: [
        {
          data: [vagasEmAndamento, vagasFinalizadas],
          backgroundColor: [
            documentStyle.getPropertyValue('--p-green-500'),
            documentStyle.getPropertyValue('--p-gray-500'),
          ],
        },
      ],
    };

    this.barChartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: { legend: { labels: { color: textColor } } },
      scales: {
        x: {
          ticks: { color: textColorSecondary },
          grid: { color: surfaceBorder },
        },
        y: {
          ticks: { color: textColorSecondary },
          grid: { color: surfaceBorder },
        },
      },
    };

    this.doughnutChartOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
    };
  }
}
