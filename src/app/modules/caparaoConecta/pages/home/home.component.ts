import { Component } from '@angular/core';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ComponentContainerVagasComponent } from '../../components/component-container-vagas/component-container-vagas.component';
import { CardVagaComponent } from '../../components/card-vaga/card-vaga.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-home',
  imports: [CabecalhoComponent, 
            FooterComponent, 
            ComponentContainerVagasComponent, 
            CardVagaComponent, 
            MatFormFieldModule, 
            MatInputModule, 
            MatSelectModule,
            MatCheckboxModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
