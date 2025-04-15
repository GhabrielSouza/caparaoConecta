import { Component } from '@angular/core';
import { CabecalhoComponent } from "../cabecalho/cabecalho.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-detalhes-vaga',
  imports: [CabecalhoComponent, FooterComponent],
  templateUrl: './detalhes-vaga.component.html',
  styleUrl: './detalhes-vaga.component.scss'
})
export class DetalhesVagaComponent {
 texto: string = "Reconhecida fábrica de Software, com forte atuação em desenvolvimento  de soluções completas de Desktop, Mobile, IIoT e Industria 4.0, busca Desenvolvedor  Web JR focado em HTML e CSS para integrar sua equipe e atuar no desenvolvimento e evolução de soluções Web. Reconhecida fábrica de Software, com forte atuação em desenvolvimento  de soluções completas de Desktop, Mobile, IIoT e Industria 4.0, busca Desenvolvedor  Web JR focado em HTML e CSS para integrar sua equipe e atuar no desenvolvimento e evolução de soluções Web.";
 containerFooter: boolean = true;
 visaoCandidato: boolean = true;
}
