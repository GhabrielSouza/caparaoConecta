import { Component, OnInit, signal } from '@angular/core';
import { IVagas } from '../../interface/IVagas.interface';

import { EStatusVaga } from '../../enum/EStatusVaga.enum';
import { ComponentContainerVagasComponent } from '../../components/component-container-vagas/component-container-vagas.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';

import { CardVagaEmpresaComponent } from '../../components/cards/card-vaga-empresa/card-vaga-empresa.component';

@Component({
  selector: 'app-home-empresa',
  templateUrl: './homepage-empresa.component.html',
  styleUrl: './homepage-empresa.component.scss',
  imports: [
    ComponentContainerVagasComponent,
    FooterComponent,
    CabecalhoComponent,
    CardVagaEmpresaComponent,
  ],
})
export class HomepageEmpresaComponent implements OnInit {
  vagasOfertadas: IVagas[] = [];
  vagasEncerradas: IVagas[] = [];
  idEmpresa = 1; // Substitua pelo ID da empresa logada


  constructor() {}

  ngOnInit(): void {
    this.vagasOfertadas = this.vagasOb().filter(
      (vaga) =>
        vaga.id_empresa === this.idEmpresa &&
        vaga.status === EStatusVaga.EM_ANDAMENTO
    );
    this.vagasEncerradas = this.vagasOb().filter(
      (vaga) =>
        vaga.id_empresa === this.idEmpresa &&
        vaga.status === EStatusVaga.FINALIZADO
    );
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
      id_empresa: 102,
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
