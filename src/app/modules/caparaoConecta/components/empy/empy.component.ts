import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonPrimaryComponent } from '../buttons/button-primary/button-primary.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empy',
  imports: [ButtonPrimaryComponent, CommonModule],
  templateUrl: './empy.component.html',
  styleUrl: './empy.component.scss',
})
export class EmpyComponent {
  @Input() titulo: string = '';
  @Input() mensagem: string = '';
  @Input() icone: string = '';
  @Input() textoBotao: string = '';
  @Input() botaoHiddem!: boolean;
  @Output() botaoClicado = new EventEmitter<void>();

  public navegarParaVagas() {
    this.botaoClicado.emit();
  }
}
