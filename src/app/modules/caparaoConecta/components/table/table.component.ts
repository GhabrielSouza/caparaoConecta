import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ButtonPrimaryComponent } from '../buttons/button-primary/button-primary.component';
import { IHabilidades } from '../../interface/IHabilidades.interface';
import { ICursos } from '../../interface/ICursos.inteface';

@Component({
  selector: 'app-table',
  imports: [MatPaginator, CommonModule, ButtonPrimaryComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() title: string = '';

  @Input() addLabel: string = 'Adicionar Item';

  @Input() data: any[] = [];

  @Input() columns: string[] = [];

  @Output() addAction = new EventEmitter<void>();

  @Output() editAction = new EventEmitter<any>();

  @Output() toggleStatusAction = new EventEmitter<any>();

  onAdd(): void {
    this.addAction.emit();
  }

  onEdit(item: any): void {
    this.editAction.emit(item);
  }

  onToggleStatus(item: any): void {
    this.toggleStatusAction.emit(item);
  }
}
