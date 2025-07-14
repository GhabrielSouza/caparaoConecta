import { Component } from '@angular/core';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { ComponentContainerVagasComponent } from '../../components/component-container-vagas/component-container-vagas.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ERoleUser } from '../../enum/ERoleUser.enum';
import { IVaga } from '../../interface/IVaga.interface';
import { CardVagaFavoritaComponent } from '../../components/cards/card-vaga-favorita/card-vaga-favorita.component';

@Component({
  selector: 'app-favoritas',
  imports: [
    CabecalhoComponent,
    ComponentContainerVagasComponent,
    FooterComponent,
    CardVagaFavoritaComponent,
  ],
  templateUrl: './favoritas.component.html',
  styleUrl: './favoritas.component.scss',
})
export class FavoritasComponent {
  public role: ERoleUser | null = ERoleUser.CANDIDATO;
  public roleEnum = ERoleUser;

  vagasOfertadas: IVaga[] = [];
  vagasEncerradas: IVaga[] = [];
  vagasPublicas: IVaga[] = [];
  idUsuario = 1;

  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {}
}
