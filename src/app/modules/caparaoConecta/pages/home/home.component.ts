import { Component, OnInit, signal } from '@angular/core';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ComponentContainerVagasComponent } from '../../components/component-container-vagas/component-container-vagas.component';
import { CardVagaComponent } from '../../components/cards/card-vaga/card-vaga.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { IVagas } from '../../interface/IVagas.interface';
import { CardVagaPublicaComponent } from '../../components/cards/card-vaga-publica/card-vaga-publica.component';
import { EStatusVaga } from '../../enum/EStatusVaga.enum';
import { ERoleUser } from '../../enum/ERoleUser.enum';
import { CardVagaEmpresaComponent } from '../../components/cards/card-vaga-empresa/card-vaga-empresa.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { DetalhesVagaComponent } from '../../components/detalhes-vaga/detalhes-vaga.component';

@Component({
  selector: 'app-home',
  imports: [
    CabecalhoComponent,
    FooterComponent,
    ComponentContainerVagasComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    CardVagaPublicaComponent,
    CardVagaEmpresaComponent,
    RouterModule,
    DetalhesVagaComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public role: ERoleUser | null = ERoleUser.EMPRESA;
  public roleEnum = ERoleUser;

  vagasOfertadas: IVagas[] = [];
  vagasEncerradas: IVagas[] = [];
  idUsuario = 1;

  vagasPublicas: IVagas[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.vagasPublicas = this.vagasOb();

    this.vagasOfertadas = this.vagasOb().filter(
      (vaga) =>
        vaga.id_empresa === this.idUsuario &&
        vaga.status === EStatusVaga.EM_ANDAMENTO
    );
    this.vagasEncerradas = this.vagasOb().filter(
      (vaga) =>
        vaga.id_empresa === this.idUsuario &&
        vaga.status === EStatusVaga.FINALIZADO
    );
  }

  navegarParaDetalhe(vaga: any) {
    if (vaga?.id_vagas) {
      this.router.navigate(['/detalhe-da-vaga', vaga.id_vagas]);
    }
  }
  

  public vagasOb = signal<IVagas[]>([
    {
      id_vagas: 1,
      titulo_vaga: 'Desenvolvedor Front-end',
      descricao: 'Desenvolver interfaces web utilizando React e TypeScript',
      salario: 8000,
      status: EStatusVaga.EM_ANDAMENTO,
      data_criacao: new Date('2023-05-10'),
      data_fechamento: new Date('2023-06-10'),
      qtd_vaga: 3,
      qtd_vagas_preenchidas: 1,
      modalidade_da_vaga: 'Remoto',
      id_empresa: 1,
    },
    {
      id_vagas: 2,
      titulo_vaga: 'Analista de Dados',
      descricao: 'Analisar dados e criar relatórios utilizando Power BI e SQL',
      salario: 6500,
      status: EStatusVaga.EM_ANDAMENTO,
      data_criacao: new Date('2023-04-15'),
      data_fechamento: new Date('2023-05-30'),
      qtd_vaga: 2,
      qtd_vagas_preenchidas: 0,
      modalidade_da_vaga: 'Híbrido',
      id_empresa: 1,
    },
    {
      id_vagas: 3,
      titulo_vaga: 'Gerente de Projetos',
      descricao: 'Gerenciar projetos de TI utilizando metodologias ágeis',
      salario: 12000,
      status: EStatusVaga.FINALIZADO,
      data_criacao: new Date('2023-01-20'),
      data_fechamento: new Date('2023-03-20'),
      qtd_vaga: 1,
      qtd_vagas_preenchidas: 1,
      modalidade_da_vaga: 'Presencial',
      id_empresa: 1,
    },
    {
      id_vagas: 4,
      titulo_vaga: 'Gerente de Projetos',
      descricao: 'Gerenciar projetos de TI utilizando metodologias ágeis',
      salario: 12000,
      status: EStatusVaga.FINALIZADO,
      data_criacao: new Date('2023-01-20'),
      data_fechamento: new Date('2023-03-20'),
      qtd_vaga: 1,
      qtd_vagas_preenchidas: 1,
      modalidade_da_vaga: 'Presencial',
      id_empresa: 1,
    },
    {
      id_vagas: 5,
      titulo_vaga: 'Gerente de Projetos',
      descricao: 'Gerenciar projetos de TI utilizando metodologias ágeis',
      salario: 12000,
      status: EStatusVaga.FINALIZADO,
      data_criacao: new Date('2023-01-20'),
      data_fechamento: new Date('2023-03-20'),
      qtd_vaga: 1,
      qtd_vagas_preenchidas: 1,
      modalidade_da_vaga: 'Presencial',
      id_empresa: 1,
    },
    {
      id_vagas: 6,
      titulo_vaga: 'Gerente de Projetos',
      descricao: 'Gerenciar projetos de TI utilizando metodologias ágeis',
      salario: 12000,
      status: EStatusVaga.FINALIZADO,
      data_criacao: new Date('2023-01-20'),
      data_fechamento: new Date('2023-03-20'),
      qtd_vaga: 1,
      qtd_vagas_preenchidas: 1,
      modalidade_da_vaga: 'Presencial',
      id_empresa: 1,
    },
  ]);
}
