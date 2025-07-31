import { Component, Input, OnInit } from '@angular/core';
import { IPessoaFisica } from '../../interface/IPessoaFisica.interface';

@Component({
  selector: 'app-candidato-selecionado',
  templateUrl: './candidato-selecionado.component.html',
  styleUrls: ['./candidato-selecionado.component.scss'],
})
export class CandidatoSelecionadoComponent implements OnInit {
  @Input() public candidatos: IPessoaFisica[] = [];

  ngOnInit(): void {
    console.log(this.candidatos);
  }

  getWhatsAppLink(candidato: IPessoaFisica): string {
    const telefoneLimpo = candidato.pessoa?.telefone?.replace(/\D/g, '') ?? '';
    return 'https://wa.me/55' + telefoneLimpo;
  }
}
