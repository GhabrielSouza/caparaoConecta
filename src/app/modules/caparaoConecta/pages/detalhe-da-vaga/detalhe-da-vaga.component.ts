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
  ],
})
export class DetalheDaVagaComponent implements OnInit {
  vaga!: IVaga;

  private route = inject(ActivatedRoute);
  private vagasService = inject(VagasService);
  private userAuth = inject(AuthService);

  public user = this.userAuth.currentUser;

  public statusCarregamento = signal<'carregando' | 'concluido' | 'erro'>(
    'carregando'
  );

  public role = computed(() => {
    const roleName = this.user()?.tipo_usuario?.nome;
    return (roleName as ERoleUser) || ERoleUser.GUEST;
  });

  ngOnInit(): void {
    this.getVagaId();
  }

  public getVagaId() {
    this.statusCarregamento.set('carregando');
    const vagaIdString = this.route.snapshot.paramMap.get('id');

    if (vagaIdString) {
      const vagaId = +vagaIdString;

      this.vagasService.httpListVagasId$(vagaId).subscribe({
        next: (data) => {
          this.statusCarregamento.set('concluido');
          this.vaga = data;
        },
        error: (error) => {
          this.statusCarregamento.set('erro');
        },
      });
    } else {
      console.error('ID da vaga não encontrado na URL!');
    }
  }
}
