import { Component } from '@angular/core';

@Component({
  selector: 'app-candidato-selecionado',
  templateUrl: './candidato-selecionado.component.html',
  styleUrls: ['./candidato-selecionado.component.scss']
})
export class CandidatoSelecionadoComponent {
  candidato = {
    nome: 'Ghabriel de Souza dos Santos',
  };
}
