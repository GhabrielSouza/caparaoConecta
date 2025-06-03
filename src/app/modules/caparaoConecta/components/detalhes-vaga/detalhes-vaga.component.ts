import { Component } from '@angular/core';
import { ERoleUser } from '../../enum/ERoleUser.enum';
import { ButtonPrimaryComponent } from '../buttons/button-primary/button-primary.component';
import { CommonModule, Location } from '@angular/common';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { DashboardCardComponent } from "../../pages/dashboard/dashboard-card/dashboard-card.component";
import { ComponentAccordionComponent } from "../component-accordion/component-accordion.component";
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';
import { CandidatoSelecionadoComponent } from '../candidato-selecionado/candidato-selecionado.component';

@Component({
  selector: 'app-detalhes-vaga',
  imports: [ButtonPrimaryComponent, CommonModule, MatCheckboxModule, DashboardCardComponent,MatRadioModule ,ComponentAccordionComponent,MatChipsModule, CandidatoSelecionadoComponent],
  templateUrl: './detalhes-vaga.component.html',
  styleUrl: './detalhes-vaga.component.scss'
})
export class DetalhesVagaComponent {
 texto: string = "Reconhecida fábrica de Software, com forte atuação em desenvolvimento  de soluções completas de Desktop, Mobile, IIoT e Industria 4.0, busca Desenvolvedor  Web JR focado em HTML e CSS para integrar sua equipe e atuar no desenvolvimento e evolução de soluções Web. Reconhecida fábrica de Software, com forte atuação em desenvolvimento  de soluções completas de Desktop, Mobile, IIoT e Industria 4.0, busca Desenvolvedor  Web JR focado em HTML e CSS para integrar sua equipe e atuar no desenvolvimento e evolução de soluções Web.";
 containerFooter: boolean = false;
 visaoCandidato: boolean = true;

 visaoDetalhes: boolean = true;
 visaoEstatistica: boolean = false;

 public role: ERoleUser | null = ERoleUser.EMPRESA;
 public roleEnum = ERoleUser;

 nomeVaga: string = "Desenvolvedor Web JR";
 nomeCandidato: string = "Lucas Silva";
 habilidades: any[] = [];

 
constructor(private location: Location){}

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

  voltar(){
    this.location.back();
  }

}
