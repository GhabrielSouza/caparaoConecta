import { Component, inject } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { CardVagaComponent } from '../../components/card-vaga/card-vaga.component';
import { ComponentContainerVagasComponent } from '../../components/component-container-vagas/component-container-vagas.component';
import { SelectRegisterDialogComponent } from '../../components/dialogs/select-register-dialog/select-register-dialog.component';
import { EDialogEnum } from '../../enum/EDialogEnum.enum';
import { SelecionarVagaComponent } from '../../components/dialogs/selecionar-vaga/selecionar-vaga.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-homepage-empresa',
  imports: [FooterComponent, CabecalhoComponent, CardVagaComponent, ComponentContainerVagasComponent],
  templateUrl: './homepage-empresa.component.html',
  styleUrl: './homepage-empresa.component.scss'
})
export class HomepageEmpresaComponent {
  #dialog = inject(MatDialog);

  openDialogSelecionarVaga():void{
    this.#dialog.open(SelecionarVagaComponent,{
      panelClass:EDialogEnum.PROJETOS,
    })
}

}
