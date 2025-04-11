import { Component, computed, inject, Inject, Input, model, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { EDialogEnum } from '../../../enum/EDialogEnum.enum';
import { DialogHabilidadesComponent } from '../dialog-habilidades/dialog-habilidades.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-cadastro-vaga-dialog',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatTooltipModule
  ],
  templateUrl: './cadastro-vaga-dialog.component.html',
  styleUrl: './cadastro-vaga-dialog.component.scss',
})
export class CadastroVagaDialogComponent {
  @Input() public botaoCandidatar: string = '';
  @Input() public botaoSair: string = '';

  #dialog = Inject(MatDialog);

  favoritar: boolean = false;

  public closeModal(): void {
    this._dialogRef.close();
  }

  public favoritarVaga() {
    this.favoritar = !this.favoritar;
  }

  openDialogHabilidades(): void {
    this.#dialog.open(DialogHabilidadesComponent, {
      panelClass: EDialogEnum.PROJETOS,
      data: 'Adicionar habilidades',
    });
  }

  public formXp: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<CadastroVagaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private router: Router,
    private _fb: FormBuilder
  ) {
    this.formXp = this._fb.group({
      habilidades: ['', [Validators.required]],
    });
  }

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly currentFruit = model('');
  readonly fruits = signal(['']);
  readonly allFruits: string[] = [
    'Apple',
    'Lemon',
    'Lime',
    'Orange',
    'Strawberry',
  ];
  readonly filteredFruits = computed(() => {
    const currentFruit = this.currentFruit().toLowerCase();
    return currentFruit
      ? this.allFruits.filter((fruit) =>
          fruit.toLowerCase().includes(currentFruit)
        )
      : this.allFruits.slice();
  });

  readonly announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.fruits.update((fruits) => [...fruits, value]);
    }

    this.currentFruit.set('');
  }

  remove(fruit: string): void {
    this.fruits.update((fruits) => {
      const index = fruits.indexOf(fruit);
      if (index < 0) {
        return fruits;
      }

      fruits.splice(index, 1);
      this.announcer.announce(`Removed ${fruit}`);
      return [...fruits];
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.update((fruits) => [...fruits, event.option.viewValue]);
    this.currentFruit.set('');
    event.option.deselect();
  }
}
