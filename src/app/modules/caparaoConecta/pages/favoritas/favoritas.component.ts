import { VagasService } from './../../../../services/vaga/vagas.service';
import { Component, computed, inject, OnInit } from '@angular/core';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { ComponentContainerVagasComponent } from '../../components/component-container-vagas/component-container-vagas.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ERoleUser } from '../../enum/ERoleUser.enum';
import { IVaga } from '../../interface/IVaga.interface';
import { CardVagaFavoritaComponent } from '../../components/cards/card-vaga-favorita/card-vaga-favorita.component';
import { AuthService } from '../../../../services/auth-caparao/login.service';
import { EStatusVaga } from '../../enum/EStatusVaga.enum';
import { ButtonPrimaryComponent } from '../../components/buttons/button-primary/button-primary.component';
import { EmpyComponent } from '../../components/empy/empy.component';
import { ButtonReturnTopComponent } from '../../components/buttons/button-return-top/button-return-top.component';

@Component({
  selector: 'app-favoritas',
  imports: [
    CabecalhoComponent,
    ComponentContainerVagasComponent,
    FooterComponent,
    CardVagaFavoritaComponent,
    EmpyComponent,
    ButtonReturnTopComponent,
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
  vagasEncerradas: IVaga[] | null = [];
  vagasPublicas: IVaga[] | null = [];

  public vagasFavoritas = this.vagaService.getListVagaFavorita;

  public minhasCandidaturas = this.vagaService.getListVagaMinhasCandidaturas;

  public user = this.userAuth.currentUser;

  public role = computed(() => {
    const roleName = this.user()?.tipo_usuario?.nome;
    return (roleName as ERoleUser) || ERoleUser.GUEST;
  });
  public roleEnum = ERoleUser;

  ngOnInit(): void {
    this.vagaService.httpListarFavoritar$().subscribe();
    this.vagaService.httpListarMinhasCandidaturas$().subscribe();
  }

  public getVagasEncerradas = computed(() => {
    return (this.vagasEncerradas =
      this.minhasCandidaturas()?.filter(
        (encerrada) => encerrada.status === EStatusVaga.FINALIZADO
      ) ?? null);
  });

  public getVagasEmAndamento = computed(() => {
    return (this.vagasPublicas =
      this.minhasCandidaturas()?.filter(
        (encerrada) => encerrada.status === EStatusVaga.EM_ANDAMENTO
      ) ?? null);
  });

  navegarParaDetalhe(vaga: IVaga) {
    if (vaga?.id_vagas) {
      this.router.navigate(['/detalhe-da-vaga', vaga.id_vagas]);
    }
  }

  navegarParaVagas() {
    this.router.navigate(['']);
  }
}
