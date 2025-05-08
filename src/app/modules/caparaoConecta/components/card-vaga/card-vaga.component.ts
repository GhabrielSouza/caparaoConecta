import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EDialogEnum } from '../../enum/EDialogEnum.enum';
import { VagaDialogComponent } from '../dialogs/vaga-dialog/vaga-dialog.component';
import { ERoleUser } from '../../enum/ERoleUser.enum';
import { CommonModule } from '@angular/common';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { IVagas } from '../../interface/IVagas.interface';
import { EStatusVaga } from '../../enum/EStatusVaga.enum';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';


@Component({
  selector: 'app-card-vaga',
  imports: [CommonModule, Carousel, ButtonModule, Tag, PaginatorModule],
  standalone: true,
  templateUrl: './card-vaga.component.html',
  styleUrl: './card-vaga.component.scss'
})
export class CardVagaComponent implements OnInit{
  #dialog = inject(MatDialog)

  @Input() public imagem:string = 'assets/imgs/semFoto.jpg';
  @Input() public titulo:string = 'Titulo da vaga';
  @Input() public empresa:string = 'Empresa';
  @Input() public qtd_vagas:number = 0;

  vagas:IVagas[] | null = null;
  
  public role: ERoleUser | null = ERoleUser.GUEST;
  public roleEnum = ERoleUser;

  public openModel():void{
    this.#dialog.open(VagaDialogComponent, {
      panelClass: EDialogEnum.VAGA,
      
    })
  }

  ngOnInit(): void {
    this.vagas = this.vagasOb();
    console.log(this.vagas);
  }

  public vagasOb = signal<IVagas[]>([
      {
        id_vagas: 1,
        titulo_vaga: "Desenvolvedor Front-end",
        descricao: "Desenvolver interfaces web utilizando React e TypeScript",
        salario: 8000,
        status: EStatusVaga.EM_ANDAMENTO,
        data_criacao: new Date("2023-05-10"),
        data_fechamento: new Date("2023-06-10"),
        qtd_vaga: 3,
        qtd_vagas_preenchidas: 1,
        modalidade_da_vaga: "Remoto",
        id_empresa: 101
    },
    {
      id_vagas: 2,
      titulo_vaga: "Analista de Dados",
      descricao: "Analisar dados e criar relatórios utilizando Power BI e SQL",
      salario: 6500,
      status: EStatusVaga.EM_ANDAMENTO,
      data_criacao: new Date("2023-04-15"),
      data_fechamento: new Date("2023-05-30"),
      qtd_vaga: 2,
      qtd_vagas_preenchidas: 0,
      modalidade_da_vaga: "Híbrido",
      id_empresa: 102
  },{
    id_vagas: 3,
    titulo_vaga: "Gerente de Projetos",
    descricao: "Gerenciar projetos de TI utilizando metodologias ágeis",
    salario: 12000,
    status: EStatusVaga.FINALIZADO,
    data_criacao: new Date("2023-01-20"),
    data_fechamento: new Date("2023-03-20"),
    qtd_vaga: 1,
    qtd_vagas_preenchidas: 1,
    modalidade_da_vaga: "Presencial",
    id_empresa: 103
  },
  {
    id_vagas: 4,
    titulo_vaga: "Gerente de Projetos",
    descricao: "Gerenciar projetos de TI utilizando metodologias ágeis",
    salario: 12000,
    status: EStatusVaga.FINALIZADO,
    data_criacao: new Date("2023-01-20"),
    data_fechamento: new Date("2023-03-20"),
    qtd_vaga: 1,
    qtd_vagas_preenchidas: 1,
    modalidade_da_vaga: "Presencial",
    id_empresa: 103
  },
  {
    id_vagas: 5,
    titulo_vaga: "Gerente de Projetos",
    descricao: "Gerenciar projetos de TI utilizando metodologias ágeis",
    salario: 12000,
    status: EStatusVaga.FINALIZADO,
    data_criacao: new Date("2023-01-20"),
    data_fechamento: new Date("2023-03-20"),
    qtd_vaga: 1,
    qtd_vagas_preenchidas: 1,
    modalidade_da_vaga: "Presencial",
    id_empresa: 103
  },{
    id_vagas: 6,
    titulo_vaga: "Gerente de Projetos",
    descricao: "Gerenciar projetos de TI utilizando metodologias ágeis",
    salario: 12000,
    status: EStatusVaga.FINALIZADO,
    data_criacao: new Date("2023-01-20"),
    data_fechamento: new Date("2023-03-20"),
    qtd_vaga: 1,
    qtd_vagas_preenchidas: 1,
    modalidade_da_vaga: "Presencial",
    id_empresa: 103
  }
  ]);
}
