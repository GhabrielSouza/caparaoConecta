import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IVagas } from '../../interface/IVagas.interface';
import { EStatusVaga } from '../../enum/EStatusVaga.enum';
import { CommonModule } from '@angular/common';
import { DetalhesVagaComponent } from '../../components/detalhes-vaga/detalhes-vaga.component';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-detalhe-da-vaga',
  templateUrl: './detalhe-da-vaga.component.html',
  styleUrl: './detalhe-da-vaga.component.scss',
  imports: [CommonModule, DetalhesVagaComponent, CabecalhoComponent, FooterComponent]
})
export class DetalheDaVagaComponent implements OnInit {
  vaga: IVagas | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    
    const todasVagas: IVagas[] = [
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
      }
    ];

    this.vaga = todasVagas.find((v) => v.id_vagas === id);
  }
}
