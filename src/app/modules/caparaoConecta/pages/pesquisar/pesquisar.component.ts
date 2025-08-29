import { Component, computed, inject, signal } from '@angular/core';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { AuthService } from '../../../../services/auth-caparao/login.service';
import { RegisterService } from '../../../../services/register-caparao/register.service';
import { ERoleUser } from '../../enum/ERoleUser.enum';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { CardPerfilComponent } from '../../components/cards/card-perfil/card-perfil.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-pesquisar',
  imports: [
    CommonModule,
    FormsModule,
    FooterComponent,
    CabecalhoComponent,
    CardPerfilComponent,
    Paginator,
  ],
  templateUrl: './pesquisar.component.html',
  styleUrl: './pesquisar.component.scss',
})
export class PesquisarComponent {
  private pessoasService = inject(RegisterService);
  private userAuth = inject(AuthService);

  // --- SINAIS DE ESTADO ---
  public searchTerm = signal<string>('');
  private todasAsPessoas = this.pessoasService.getListUsuarios;
  public currentPage = signal(0);
  public pageSize = signal(6);
  public user = this.userAuth.currentUser;

  // --- SINAIS COMPUTADOS ---
  public role = computed(
    () => (this.user()?.tipo_usuario?.nome as ERoleUser) || ERoleUser.GUEST
  );
  public roleEnum = ERoleUser;

  // 1. Primeiro, filtramos a lista com base no tipo de usuário e na busca
  public pessoasFiltradas = computed(() => {
    const termo = this.searchTerm().toLowerCase().trim();
    const pessoas = this.todasAsPessoas() ?? [];
    const roleAtual = this.role();

    const listaBase = pessoas.filter((p) => {
      if (roleAtual === ERoleUser.EMPRESA)
        return p.usuario.tipo_usuario.nome === ERoleUser.CANDIDATO;
      if (roleAtual === ERoleUser.CANDIDATO)
        return p.usuario.tipo_usuario.nome === ERoleUser.EMPRESA;
      return true; // Para GUEST, mostra todos
    });

    if (!termo) return listaBase;

    return listaBase.filter((p) => p.nome.toLowerCase().includes(termo));
  });

  // 2. Depois, paginamos a lista JÁ FILTRADA
  public pessoasPaginadas = computed(() => {
    const pessoas = this.pessoasFiltradas();
    const start = this.currentPage() * this.pageSize();
    return pessoas.slice(start, start + this.pageSize());
  });

  // 3. Signal separado para o total de registros, para maior clareza
  public totalFiltrado = computed(() => this.pessoasFiltradas().length);

  ngOnInit(): void {
    this.getUsuarios();
  }

  public getUsuarios() {
    this.pessoasService.httpListPessoas$().subscribe();
  }

  onPageChange(event: PaginatorState) {
    this.currentPage.set(event.page ?? 0);
    this.pageSize.set(event.rows ?? 6);
  }
}
