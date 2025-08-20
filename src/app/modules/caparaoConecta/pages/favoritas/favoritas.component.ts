import { Component, computed, inject, OnInit } from '@angular/core';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { ComponentContainerVagasComponent } from '../../components/component-container-vagas/component-container-vagas.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ERoleUser } from '../../enum/ERoleUser.enum';
import { IVaga } from '../../interface/IVaga.interface';
import { CardVagaFavoritaComponent } from '../../components/cards/card-vaga-favorita/card-vaga-favorita.component';
import { AuthService } from '../../../../services/auth-caparao/login.service';
import { VagasService } from '../../../../services/vaga/vagas.service';

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
export class FavoritasComponent implements OnInit {
  private userAuth = inject(AuthService);
  private vagaService = inject(VagasService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  vagasOfertadas: IVaga[] = [];
  vagasEncerradas: IVaga[] = [];
  vagasPublicas: IVaga[] = [];
  vagasFavoritas: IVaga[] = [];
  public user = this.userAuth.currentUser;

  public role = computed(() => {
    const roleName = this.user()?.tipo_usuario?.nome;
    return (roleName as ERoleUser) || ERoleUser.GUEST;
  });
  public roleEnum = ERoleUser;

  ngOnInit(): void {
    this.getVagasFavoritas();
  }

  public getVagasFavoritas() {
    return this.vagaService.httpListarFavoritar$().subscribe({
      next: (vagas) => {
        this.vagasFavoritas = vagas;
        console.log(this.vagasFavoritas);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
