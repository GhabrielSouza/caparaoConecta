import { Component, Input, signal } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion'; 

@Component({
  selector: 'app-component-accordion',
  imports: [MatExpansionModule],
  templateUrl: './component-accordion.component.html',
  styleUrl: './component-accordion.component.scss'
})
export class ComponentAccordionComponent {
  @Input() public title = '';
  readonly panelOpenState = signal(false);
}
