import { Component, Input, OnInit, signal } from '@angular/core';
import { IPessoaFisica } from '../../interface/IPessoaFisica.interface';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-candidato-selecionado',
  templateUrl: './candidato-selecionado.component.html',
  styleUrls: ['./candidato-selecionado.component.scss'],
})
export class CandidatoSelecionadoComponent implements OnInit {
  @Input() public candidatos: IPessoaFisica[] = [];

  public url = signal(environment.apiAuth);

  ngOnInit(): void {}

  getWhatsAppLink(candidato: IPessoaFisica): string {
    const telefoneLimpo = candidato.pessoa?.telefone?.replace(/\D/g, '') ?? '';
    return 'https://wa.me/55' + telefoneLimpo;
  }
}
