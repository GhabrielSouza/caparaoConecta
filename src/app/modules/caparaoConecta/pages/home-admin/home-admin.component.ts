import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { DashboardCardComponent } from '../dashboard/dashboard-card/dashboard-card.component';
import { CardVagaComponent } from '../../components/cards/card-vaga/card-vaga.component';
import { UIChart } from 'primeng/chart';
import { EStatusVaga } from '../../enum/EStatusVaga.enum';
import { VagasService } from '../../../../services/vaga/vagas.service';
import { IVaga } from '../../interface/IVaga.interface';
import { IPessoa } from '../../interface/IPessoa.interface';
import { RegisterService } from '../../../../services/register-caparao/register.service';

@Component({
  selector: 'app-home-admin',
  imports: [DashboardCardComponent, UIChart],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.scss',
})
export class HomeAdminComponent implements OnInit {
  public vagas = signal<IVaga[]>([]);
  public usuarios = signal<IPessoa[]>([]);

  private vagasService = inject(VagasService);
  private pessoasService = inject(RegisterService);

  public barChartData: any;
  public barChartOptions: any;

  public barChartDataTypeUsers: any;
  public barChartOptionsTypeUsers: any;

  public doughnutChartData: any;
  public doughnutChartOptions: any;

  constructor() {
    effect(() => {
      if (typeof window !== 'undefined' && this.vagas().length > 0) {
        this.atualizarDadosDosGraficos();
      }
    });
  }

  ngOnInit(): void {
    this.getVagas();
    this.getUsuarios();
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

  public getUsuarios() {
    return this.pessoasService.httpListPessoas$().subscribe({
      next: (usuarios) => {
        this.usuarios.set(usuarios);
        console.log(this.usuarios());
      },
      error: (error) => {
        console.error('Error fetching usuarios:', error);
      },
    });
  }

  public contratacoes = computed(() => {
    return this.vagas().reduce(
      (acc, vaga) =>
        acc +
        (vaga.candidato?.filter((c) => c.pivot.status === 'contratado')
          .length || 0),
      0
    );
  });

  public atualizarDadosDosGraficos(): void {
    const vagas = this.vagas();
    const usuarios = this.usuarios();

    if (vagas.length === 0) return;

    if (usuarios.length === 0) return;

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--p-text-muted-color'
    );
    const surfaceBorder = documentStyle.getPropertyValue(
      '--p-content-border-color'
    );

    const contagemPorMes = new Array(12).fill(0);
    for (const usuario of usuarios) {
      if (usuario.created_at) {
        const dataCadastro = new Date(usuario.created_at);
        const mes = dataCadastro.getMonth();
        contagemPorMes[mes]++;
      }
    }

    this.barChartData = {
      labels: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ],
      datasets: [
        {
          label: 'Novos Usuários por Mês',
          data: contagemPorMes,
          backgroundColor: documentStyle.getPropertyValue('--p-green-500'),
        },
      ],
    };

    this.barChartDataTypeUsers = {
      labels: ['Candidatos', 'Empresas'],
      datasets: [
        {
          label: 'Tipo de Usuários',
          data: [
            usuarios.filter((u) => u.usuario?.tipo_usuario.nome === 'EMPRESA')
              .length,
            usuarios.filter((u) => u.usuario?.tipo_usuario.nome === 'CANDIDATO')
              .length,
          ],
          backgroundColor: [
            documentStyle.getPropertyValue('--p-green-500'),
            documentStyle.getPropertyValue('--p-green-700'),
          ],
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
          ticks: { color: textColorSecondary, stepSize: 1, precision: 0 },
          grid: { color: surfaceBorder },
        },
      },
    };

    this.barChartOptionsTypeUsers = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: { legend: { labels: { color: textColor } } },
      scales: {
        x: {
          ticks: { color: textColorSecondary, stepSize: 1, precision: 0 },
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
