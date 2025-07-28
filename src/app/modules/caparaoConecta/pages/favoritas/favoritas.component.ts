import { Component, computed, inject } from '@angular/core';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { ComponentContainerVagasComponent } from '../../components/component-container-vagas/component-container-vagas.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ERoleUser } from '../../enum/ERoleUser.enum';
import { IVaga } from '../../interface/IVaga.interface';
import { CardVagaFavoritaComponent } from '../../components/cards/card-vaga-favorita/card-vaga-favorita.component';
import { AuthService } from '../../../../services/auth-caparao/login.service';

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
  private userAuth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  vagasOfertadas: IVaga[] = [];
  vagasEncerradas: IVaga[] = [];
  vagasPublicas: IVaga[] = [];
  public user = this.userAuth.currentUser;

  public role = computed(() => {
    const roleName = this.user()?.tipo_usuario?.nome;
    return (roleName as ERoleUser) || ERoleUser.GUEST;
  });
  public roleEnum = ERoleUser;

  ngOnInit(): void {}
}
