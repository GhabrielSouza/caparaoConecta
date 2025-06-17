import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { DetalhesVagaComponent } from '../../components/detalhes-vaga/detalhes-vaga.component';
import { CardVagaEmpresaComponent } from '../../components/cards/card-vaga-empresa/card-vaga-empresa.component';
import { CardVagaPublicaComponent } from '../../components/cards/card-vaga-publica/card-vaga-publica.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ComponentContainerVagasComponent } from '../../components/component-container-vagas/component-container-vagas.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { ERoleUser } from '../../enum/ERoleUser.enum';
import { EStatusVaga } from '../../enum/EStatusVaga.enum';
import { IVaga } from '../../interface/IVaga.interface';
import { CardVagasFavoritasComponent } from '../../components/cards/card-vagas-favoritas/card-vagas-favoritas.component';

@Component({
  selector: 'app-vagas-favoritas',
  standalone: true,
  imports: [
    CabecalhoComponent,
    FooterComponent,
    ComponentContainerVagasComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    CardVagaPublicaComponent,
    CardVagaEmpresaComponent,
    RouterModule,
    DetalhesVagaComponent,
    CardVagasFavoritasComponent

  ],
  templateUrl: './vagas-favoritas.component.html',
  styleUrls: ['./vagas-favoritas.component.scss']
})
export class VagasFavoritasComponent implements OnInit {
  public role: ERoleUser | null = ERoleUser.CANDIDATO;
  public roleEnum = ERoleUser;

  vagasOfertadas: IVaga[] = [];
  vagasEncerradas: IVaga[] = [];
  vagasPublicas: IVaga[] = [];
  idUsuario = 1;

  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {}

  // ngOnInit(): void {
  //   this.vagasPublicas = this.vagasOb;

  //   this.vagasOfertadas = this.vagasOb.filter(
  //     (vaga) =>
  //       vaga.id_empresas === this.idUsuario &&
  //       vaga.status === EStatusVaga.EM_ANDAMENTO
  //   );

  //   this.vagasEncerradas = this.vagasOb.filter(
  //     (vaga) =>
  //       vaga.id_empresas === this.idUsuario &&
  //       vaga.status === EStatusVaga.FINALIZADO
  //   );
  // }

  // navegarParaDetalhe(vaga: IVaga): void {
  //   const vagaIndex = this.vagasOb.indexOf(vaga);
  //   if (vagaIndex !== -1) {
  //     this.router.navigate(['/detalhe-da-vaga', vagaIndex + 1]);
  //   }
  // }

  
}