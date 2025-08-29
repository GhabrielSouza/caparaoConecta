import { FormsModule, NgModel } from '@angular/forms';
import {
  Component,
  computed,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { CardPerfilComponent } from '../../components/cards/card-perfil/card-perfil.component';
import { IPessoa } from '../../interface/IPessoa.interface';
import { MatPaginator } from '@angular/material/paginator';
import { RegisterService } from '../../../../services/register-caparao/register.service';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { AuthService } from '../../../../services/auth-caparao/login.service';
import { ERoleUser } from '../../enum/ERoleUser.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-pesquisa',
  imports: [
    FooterComponent,
    CabecalhoComponent,
    CardPerfilComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './page-pesquisa.component.html',
  styleUrl: './page-pesquisa.component.scss',
})
export class PagePesquisaComponent implements OnInit {
  private pessoasService = inject(RegisterService);
  private userAuth = inject(AuthService);

  public user = this.userAuth.currentUser;
  public role = computed(
    () => (this.user()?.tipo_usuario?.nome as ERoleUser) || ERoleUser.GUEST
  );
  public roleEnum = ERoleUser;

  public searchTerm = signal<string>('');

  private todasAsPessoas = this.pessoasService.getListUsuarios;

  public pessoasFiltradas = computed(() => {
    const termo = this.searchTerm().toLowerCase().trim();
    const empresas = this.todasAsPessoas()?.filter(
      (pessoa) => pessoa.usuario.tipo_usuario.nome === this.roleEnum.EMPRESA
    );
    const pessoas = this.todasAsPessoas()?.filter(
      (pessoa) => pessoa.usuario.tipo_usuario.nome === this.roleEnum.CANDIDATO
    );

    if (!termo) {
      return this.role() === this.roleEnum.EMPRESA
        ? pessoas ?? []
        : empresas ?? [];
    }
    return this.role() === this.roleEnum.EMPRESA
      ? pessoas?.filter((pessoa) =>
          pessoa.nome.toLowerCase().includes(termo)
        ) ?? []
      : empresas?.filter((empresa) =>
          empresa.nome.toLowerCase().includes(termo)
        ) ?? [];
  });

  ngOnInit(): void {
    this.getUsuarios();
  }

  public getUsuarios() {
    this.pessoasService.httpListPessoas$().subscribe();
  }
}
