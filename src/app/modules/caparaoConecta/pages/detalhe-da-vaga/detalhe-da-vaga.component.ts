import { Component, OnInit, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IVagas } from '../../interface/IVagas.interface';
import { EStatusVaga } from '../../enum/EStatusVaga.enum';
import { CommonModule } from '@angular/common';
import { DetalhesVagaComponent } from '../../components/detalhes-vaga/detalhes-vaga.component';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { VagasService } from '../../../../services/vaga/vagas.service';
import { IVaga } from '../../interface/IVaga.interface';
import { AuthService } from '../../../../services/auth-caparao/login.service';
import { ERoleUser } from '../../enum/ERoleUser.enum';

@Component({
  selector: 'app-detalhe-da-vaga',
  templateUrl: './detalhe-da-vaga.component.html',
  styleUrl: './detalhe-da-vaga.component.scss',
  imports: [
    CommonModule,
    DetalhesVagaComponent,
    CabecalhoComponent,
    FooterComponent,
  ],
})
export class DetalheDaVagaComponent implements OnInit {
  vaga!: IVaga;

  private route = inject(ActivatedRoute);
  private vagasService = inject(VagasService);
  private userAuth = inject(AuthService);

  public user = this.userAuth.currentUser;

  public role = computed(() => {
    const roleName = this.user()?.tipo_usuario?.nome;
    return (roleName as ERoleUser) || ERoleUser.GUEST;
  });

  ngOnInit(): void {
    this.getVagaId();
  }

  public getVagaId() {
    const vagaIdString = this.route.snapshot.paramMap.get('id');

    console.log(vagaIdString);

    if (vagaIdString) {
      const vagaId = +vagaIdString;

      this.vagasService.httpListVagasId$(vagaId).subscribe({
        next: (data) => {
          console.log(data);
          this.vaga = data;
        },
        error: (error) => {
          console.error('Erro ao buscar vaga:', error);
        },
      });
    } else {
      console.error('ID da vaga não encontrado na URL!');
    }
  }
}
