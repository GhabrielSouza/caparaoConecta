import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-component-container-vagas',
  imports: [RouterModule],
  templateUrl: './component-container-vagas.component.html',
  styleUrl: './component-container-vagas.component.scss'
})
export class ComponentContainerVagasComponent {

  constructor(public router:Router){}

  navigateCandidatoLogin(){
    this.router.navigate(['/login']);
  }
}
