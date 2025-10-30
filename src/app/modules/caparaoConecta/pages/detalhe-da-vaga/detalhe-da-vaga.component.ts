import { Component, OnInit, computed, inject, signal } from '@angular/core';
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
import { EmpyComponent } from '../../components/empy/empy.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { ButtonReturnTopComponent } from '../../components/buttons/button-return-top/button-return-top.component';
import { concatMap } from 'rxjs';
@Component({
  selector: 'app-detalhe-da-vaga',
  templateUrl: './detalhe-da-vaga.component.html',
  styleUrl: './detalhe-da-vaga.component.scss',
  imports: [
    CommonModule,
    DetalhesVagaComponent,
    CabecalhoComponent,
    FooterComponent,
    EmpyComponent,
    SpinnerComponent,
    ButtonReturnTopComponent,
  ],
})
export class DetalheDaVagaComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private vagasService = inject(VagasService);
  private userAuth = inject(AuthService);

  public user = this.userAuth.currentUser;
  public vaga = this.vagasService.getListVagaId;

  public statusCarregamento = signal<'carregando' | 'concluido' | 'erro'>(
    'carregando'
  );

  public role = computed(() => {
    const roleName = this.user()?.tipo_usuario?.nome;
    return (roleName as ERoleUser) || ERoleUser.GUEST;
  });

  private vagaIdString = this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    this.vagasService.httpListVagasId$(+this.vagaIdString!).subscribe();
    this.getVagaId();
  }

  public getVagaId() {
    this.statusCarregamento.set('carregando');

    if (this.vagaIdString) {
      const vagaId = +this.vagaIdString;

      this.vagasService.httpListVagasId$(vagaId).subscribe({
        next: (data) => {
          this.statusCarregamento.set('concluido');
        },
        error: () => {
          this.statusCarregamento.set('erro');
        },
      });
    } else {
      console.error('ID da vaga não encontrado na URL!');
      this.statusCarregamento.set('erro');
    }
  }
}
