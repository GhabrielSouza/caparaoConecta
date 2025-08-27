import { Component, Input } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { CardPerfilComponent } from '../../components/cards/card-perfil/card-perfil.component';
import { IPessoa } from '../../interface/IPessoa.interface';

@Component({
  selector: 'app-page-pesquisa',
  imports: [FooterComponent,
    CabecalhoComponent,CardPerfilComponent],
  templateUrl: './page-pesquisa.component.html',
  styleUrl: './page-pesquisa.component.scss'
})
export class PagePesquisaComponent {

  @Input() pessoas : IPessoa [] = [];

  public getPessoas() {
    
  }

  public usuarios = [
    {
      nome: "Giovanni",
      sobrenome: "de Souza Wotkosky",
      data_de_nascimento: "02/06/2006",
      genero: "Masculino",
  
      instagram: "https://www.instagram.com/ghabriel_03",
      github: "https://github.com/GhabrielSouza",
  
      telefone: "28992228225",
      sobre: "Marceneiro",
  
      cpf: "18425180707",
  
      email: "souzaghabriel195@gmail.com",
      password: "#Bi3lgam3r",
      id_tipo_usuarios: 2,
  
      cidade: "Cariacica",
      estado: "Espírito Santo"
    },
    {
      nome: "Larissa",
      sobrenome: "Ferreira Gomes",
      data_de_nascimento: "15/09/2004",
      genero: "Feminino",
  
      instagram: "https://www.instagram.com/larissa_fg",
      github: "https://github.com/LarissaGomes",
  
      telefone: "27998765432",
      sobre: "Estudante de Design",
  
      cpf: "30514298765",
  
      email: "larissa.gomes04@gmail.com",
      password: "Lari@2025",
      id_tipo_usuarios: 1,
  
      cidade: "Vitória",
      estado: "Espírito Santo"
    },
    {
      nome: "Carlos",
      sobrenome: "Henrique Oliveira",
      data_de_nascimento: "21/03/2002",
      genero: "Masculino",
  
      instagram: "https://www.instagram.com/carloshenrique",
      github: "https://github.com/CarlosHenriqueDev",
  
      telefone: "28991234567",
      sobre: "Programador Full Stack",
  
      cpf: "41896532109",
  
      email: "carlos.dev02@hotmail.com",
      password: "Dev#2025",
      id_tipo_usuarios: 3,
  
      cidade: "Guarapari",
      estado: "Espírito Santo"
    }
  ];
  

}
