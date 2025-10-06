import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, CommonModule } from '@angular/common';

import { PerfilEmpresaComponent } from '../perfil/perfil-empresa/perfil-empresa.component';
import { PerfilCandidatoComponent } from '../perfil/perfil-candidato/perfil-candidato.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ComponentDefaultPerfilComponent } from '../../components/component-default-perfil/component-default-perfil.component';
import { ComponentPerfilDadosComponent } from '../../components/component-perfil-dados/component-perfil-dados.component';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';

import { RegisterService } from '../../../../services/register-caparao/register.service';
import { AuthService } from '../../../../services/auth-caparao/login.service';
import { IPessoa } from '../../interface/IPessoa.interface';
import { ERoleUser } from '../../enum/ERoleUser.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-visualizar-perfil',
  standalone: true,
  imports: [
    CommonModule,
    PerfilEmpresaComponent,
    PerfilCandidatoComponent,
    SpinnerComponent,
    FooterComponent,
    ComponentDefaultPerfilComponent,
    ComponentPerfilDadosComponent,
    CabecalhoComponent,
  ],
  templateUrl: './visualizar-perfil.component.html',
  styleUrl: './visualizar-perfil.component.scss',
})
export class VisualizarPerfilComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private pessoasService = inject(RegisterService);
  public userAuth = inject(AuthService);
  private location = inject(Location);
  private router = inject(Router);

  public perfil = signal<IPessoa | null>(null);
  public statusCarregamento = signal<'carregando' | 'concluido' | 'erro'>(
    'carregando'
  );

  public currentUser = this.userAuth.currentUser;

  ngOnInit(): void {
    const perfilId = this.route.snapshot.paramMap.get('id');
    if (!perfilId) return;

    const ehEmpresaVendoCandidato =
      this.userAuth.currentUser()?.tipo_usuario?.nome === ERoleUser.EMPRESA;

    const observable = ehEmpresaVendoCandidato
      ? this.pessoasService.httpVisualizarPerfilCandidato$(+perfilId)
      : this.pessoasService.httpListCandidatosIdPerfil$(+perfilId);

    if (
      perfilId &&
      this.currentUser() &&
      +perfilId === this.currentUser()!.id_pessoas
    ) {
      this.router.navigate(['/perfil']);
      return;
    }

    if (perfilId) {
      observable.subscribe({
        next: (data) => {
          this.perfil.set(data);
          this.statusCarregamento.set('concluido');
        },
        error: (err) => {
          this.statusCarregamento.set('erro');

          if (err.status === 403) {
            Swal.fire({
              icon: 'info',
              title: 'Acesso Restrito',
              text: err.error.message,
              confirmButtonText: 'OK',
              confirmButtonColor: '#359830',
            });
            this.location.back();
          }
        },
      });
    }
  }
}
