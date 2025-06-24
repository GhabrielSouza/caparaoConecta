import { Component, Input, OnInit } from '@angular/core';
import { ERoleUser } from '../../enum/ERoleUser.enum';
import { ButtonPrimaryComponent } from '../buttons/button-primary/button-primary.component';
import { CommonModule, Location } from '@angular/common';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { DashboardCardComponent } from '../../pages/dashboard/dashboard-card/dashboard-card.component';
import { ComponentAccordionComponent } from '../component-accordion/component-accordion.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';
import { CandidatoSelecionadoComponent } from '../candidato-selecionado/candidato-selecionado.component';
import { CursosSService } from '../../../../services/cursos/cursos-s.service';
import { VagasService } from '../../../../services/vagas.service';
import { ActivatedRoute } from '@angular/router';
import { IVaga } from '../../interface/IVaga.interface';
import { MatDialog } from '@angular/material/dialog';
import { CadastroVagaDialogComponent } from '../dialogs/cadastro-vaga-dialog/cadastro-vaga-dialog.component';
import { EDialogEnum } from '../../enum/EDialogEnum.enum';

@Component({
  selector: 'app-detalhes-vaga',
  imports: [
    ButtonPrimaryComponent,
    CommonModule,
    MatCheckboxModule,
    DashboardCardComponent,
    MatRadioModule,
    ComponentAccordionComponent,
    MatChipsModule,
    CandidatoSelecionadoComponent,
  ],
  templateUrl: './detalhes-vaga.component.html',
  styleUrl: './detalhes-vaga.component.scss',
})
export class DetalhesVagaComponent implements OnInit {
  texto: string =
    'Reconhecida fábrica de Software, com forte atuação em desenvolvimento  de soluções completas de Desktop, Mobile, IIoT e Industria 4.0, busca Desenvolvedor  Web JR focado em HTML e CSS para integrar sua equipe e atuar no desenvolvimento e evolução de soluções Web. Reconhecida fábrica de Software, com forte atuação em desenvolvimento  de soluções completas de Desktop, Mobile, IIoT e Industria 4.0, busca Desenvolvedor  Web JR focado em HTML e CSS para integrar sua equipe e atuar no desenvolvimento e evolução de soluções Web.';
  containerFooter: boolean = true;
  visaoCandidato: boolean = true;

  visaoDetalhes: boolean = true;
  visaoEstatistica: boolean = false;

  public role: ERoleUser | null = ERoleUser.EMPRESA;
  public roleEnum = ERoleUser;

  nomeVaga: string = 'Desenvolvedor Web JR';
  nomeCandidato: string = 'Lucas Silva';
  habilidades: any[] = [];

  @Input() vaga!: IVaga;
  @Input() IdUsuario: any;

  constructor(
    private location: Location,
    private vagaService: VagasService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  alterarImagemDetalhes: boolean = true;
  alterarImagemEstatistica: boolean = false;
  alterarBackground: boolean = true;
  alterarCorFonteDetalhes: boolean = true;
  alterarCorFonteEstatistica: boolean = false;

  public alterarDetalhes() {
    if (!this.alterarImagemDetalhes) {
      this.alterarImagemDetalhes = true;
      this.alterarImagemEstatistica = false;
      this.alterarBackground = true;
      this.alterarCorFonteDetalhes = true;
      this.alterarCorFonteEstatistica = false;
      this.visaoDetalhes = true;
      this.visaoEstatistica = false;
    }
  }

  public alterarEstatistica() {
    if (!this.alterarImagemEstatistica) {
      this.alterarImagemDetalhes = false;
      this.alterarImagemEstatistica = true;
      this.alterarBackground = false;
      this.alterarCorFonteDetalhes = false;
      this.alterarCorFonteEstatistica = true;
      this.visaoDetalhes = false;
      this.visaoEstatistica = true;
    }
  }

  voltar() {
    this.location.back();
  }

  ngOnInit(): void {}

  // public getVagaId() {
  //   const vagaIdString = this.route.snapshot.paramMap.get('id');

  //   console.log(vagaIdString);

  //   if (vagaIdString) {
  //     const vagaId = +vagaIdString;

  //     this.vagaService.httpListVagasId$(vagaId).subscribe({
  //       next: (data) => {
  //         console.log(data);
  //         this.vaga = data;
  //       },
  //       error: (error) => {
  //         console.error('Erro ao buscar vaga:', error);
  //       },
  //     });
  //   } else {
  //     console.error('ID da vaga não encontrado na URL!');
  //   }
  // }

  public finalizarVaga() {
    const vagaIdString = this.route.snapshot.paramMap.get('id');
    console.log(vagaIdString);

    const status = 'FINALIZADO';

    if (vagaIdString) {
      const vagaId = +vagaIdString;
      this.vagaService.httpFinalizarVaga$(vagaId, status).subscribe({
        next: (response) => {
          console.log('Vaga finalizada com sucesso:', response);
          this.location.back();
        },
        error: (error) => {
          console.error('Erro ao finalizar vaga:', error);
        },
      });
    }
  }

  public editarVaga() {
    this.dialog.open(CadastroVagaDialogComponent, {
      panelClass: EDialogEnum.PROJETOS,
      data: {
        id: this.IdUsuario,
      },
    });
  }
}
