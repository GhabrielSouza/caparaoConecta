import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ComponentContainerVagasComponent } from '../../components/component-container-vagas/component-container-vagas.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CardVagaPublicaComponent } from '../../components/cards/card-vaga-publica/card-vaga-publica.component';
import { EStatusVaga } from '../../enum/EStatusVaga.enum';
import { ERoleUser } from '../../enum/ERoleUser.enum';
import { CardVagaEmpresaComponent } from '../../components/cards/card-vaga-empresa/card-vaga-empresa.component';
import { Router, RouterModule } from '@angular/router';
import { IVaga } from '../../interface/IVaga.interface';
import { VagasService } from '../../../../services/vaga/vagas.service';
import { HomeAdminComponent } from '../home-admin/home-admin.component';
import { AreasAtuacaoService } from '../../../../services/areasAtuacao/areas-atuacao.service';
import { IAreasAtuacao } from '../../interface/IAreasAtuacao.interface';
import { AuthService } from '../../../../services/auth-caparao/login.service';
import { IPessoa } from '../../interface/IPessoa.interface';
import { RegisterService } from '../../../../services/register-caparao/register.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatIcon } from '@angular/material/icon';

export interface GrupoDeVagas {
  area: IAreasAtuacao;
  vagas: IVaga[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
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
    HomeAdminComponent,
    ReactiveFormsModule,
    MatIcon,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private router = inject(Router);
  private vagasService = inject(VagasService);
  private areasService = inject(AreasAtuacaoService);
  private pessoasService = inject(RegisterService);
  private userAuth = inject(AuthService);
  private fb = inject(FormBuilder);

  private todasAsVagas = signal<IVaga[]>([]);
  public areasAtuacao = signal<IAreasAtuacao[]>([]);
  public empresas = signal<IPessoa[]>([]);
  public user = this.userAuth.currentUser;
  public filtroForm!: FormGroup;

  public role = computed(() => {
    const roleName = this.user()?.tipo_usuario?.nome;
    return (roleName as ERoleUser) || ERoleUser.GUEST;
  });
  public roleEnum = ERoleUser;

  public vagasRecomendadas = computed(() => {
    const user = this.user();
    const vagas = this.todasAsVagas();

    const userAreaId =
      user?.pessoa?.pessoas_fisica?.area_atuacao?.id_areas_atuacao;

    if (this.role() !== ERoleUser.CANDIDATO || userAreaId == null) {
      return [];
    }
    return vagas.filter((v) => v.area_atuacao?.id_areas_atuacao === userAreaId);
  });

  public vagasAgrupadasPorArea = computed(() => {
    const todas = this.todasAsVagas();
    const recomendadas = this.vagasRecomendadas();
    const recomendadasIds = new Set(recomendadas.map((v) => v.id_vagas));

    const vagasRestantes = todas.filter(
      (v) => !recomendadasIds.has(v.id_vagas)
    );

    const mapaDeGrupos = new Map<number, GrupoDeVagas>();
    for (const vaga of vagasRestantes) {
      if (!vaga.area_atuacao) continue;
      const areaId = vaga.area_atuacao.id_areas_atuacao;
      if (!mapaDeGrupos.has(areaId)) {
        mapaDeGrupos.set(areaId, { area: vaga.area_atuacao, vagas: [] });
      }
      mapaDeGrupos.get(areaId)!.vagas.push(vaga);
    }
    return Array.from(mapaDeGrupos.values());
  });

  public vagasOfertadas = computed(() => {
    const user = this.user();
    if (this.role() !== ERoleUser.EMPRESA || !user) return [];
    return this.todasAsVagas().filter(
      (vaga) =>
        vaga.id_empresas === user.id_pessoas &&
        (vaga.status === EStatusVaga.EM_ANDAMENTO ||
          vaga.status === EStatusVaga.INATIVO)
    );
  });

  public vagasEncerradas = computed(() => {
    const user = this.user();
    if (this.role() !== ERoleUser.EMPRESA || !user) return [];
    return this.todasAsVagas().filter(
      (vaga) =>
        vaga.id_empresas === user.id_pessoas &&
        vaga.status === EStatusVaga.FINALIZADO
    );
  });

  ngOnInit(): void {
    this.filtroForm = this.fb.group({
      modalidade: this.fb.group({
        presencial: [false],
        hibrido: [false],
        remoto: [false],
      }),
      id_empresa: [''],
      atuacao: [''],
    });

    this.filtroForm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((formValue) => {
        this.getVagas(formValue);
      });

    this.getVagas();
    this.onListAreasAtuacao();
    this.onListEmpresas();
  }

  public getVagas(filtros?: any) {
    this.vagasService.httpListVagas$(filtros).subscribe({
      next: (data) => this.todasAsVagas.set(data),
      error: (error) => console.error('Erro ao buscar vagas:', error),
    });
  }

  public onListAreasAtuacao() {
    this.areasService.httpListAreas$().subscribe({
      next: (response) => this.areasAtuacao.set(response),
      error: (error) => console.log('Erro ao buscar áreas:', error),
    });
  }

  public onListEmpresas() {
    this.pessoasService.httpListEmpresas$().subscribe({
      next: (response) => {
        const empresasFiltradas = response.filter((pessoa) => pessoa.empresa);
        this.empresas.set(empresasFiltradas);
      },
      error: (error) => console.log('Erro ao buscar empresas:', error),
    });
  }

  navegarParaDetalhe(vaga: IVaga) {
    if (vaga?.id_vagas) {
      this.router.navigate(['/detalhe-da-vaga', vaga.id_vagas]);
    }
  }

  public limparSelecaoEmpresa(event: MouseEvent): void {
    event.stopPropagation();
    this.filtroForm.get('id_empresa')?.reset();
  }

  public limparSelecaoAtuacao(event: MouseEvent): void {
    event.stopPropagation();
    this.filtroForm.get('atuacao')?.reset();
  }
}
