import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { PerfilEmpresaComponent } from '../perfil/perfil-empresa/perfil-empresa.component';
import { PerfilCandidatoComponent } from '../perfil/perfil-candidato/perfil-candidato.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ComponentDefaultPerfilComponent } from '../../components/component-default-perfil/component-default-perfil.component';
import { ComponentPerfilDadosComponent } from '../../components/component-perfil-dados/component-perfil-dados.component';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '../../../../services/register-caparao/register.service';
import { IPessoa } from '../../interface/IPessoa.interface';
import { AuthService } from '../../../../services/auth-caparao/login.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  imports: [
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

  public perfil = signal<IPessoa | null>(null);
  public statusCarregamento = signal<'carregando' | 'concluido' | 'erro'>(
    'carregando'
  );

  ngOnInit(): void {
    // Pega o ID da URL
    const perfilId = this.route.snapshot.paramMap.get('id');

    if (perfilId) {
      this.pessoasService.httpListCandidatosIdPerfil$(+perfilId).subscribe({
        next: (data) => {
          this.perfil.set(data);
          this.statusCarregamento.set('concluido');
          console.log('Perfil carregado:', data);
          if (this.userAuth.currentUser()?.tipo_usuario?.nome === 'EMPRESA') {
            if (this.userAuth.empresaTemVagas() === null) {
              Swal.fire({
                icon: 'info',
                title: 'Atenção',
                text: 'Para visualizar perfis de candidatos, sua empresa precisa ter pelo menos uma vaga cadastrada.',
                confirmButtonText: 'Ok',
              });
              this.location.back();
            }
          }
        },
        error: (err) => {
          console.error('Erro ao buscar perfil:', err);
          this.statusCarregamento.set('erro');
        },
      });
    }
  }
}
