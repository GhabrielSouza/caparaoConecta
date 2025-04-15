import { Component, Inject , ChangeDetectionStrategy, computed, inject, model, signal} from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { SelectRegisterDialogComponent } from '../select-register-dialog/select-register-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { DateInputComponent } from '../../inputs/date-input/date-input.component';

import { PrimaryInputComponent } from '../../inputs/primary-input/primary-input.component';
import { ButtonPrimaryComponent } from '../../buttons/button-primary/button-primary.component';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormsModule} from '@angular/forms';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-dialog-habilidades',
  imports: [
    MatButtonModule,
    MatDialogContent, 
    RouterModule, 
    MatCheckboxModule,
    MatFormFieldModule, 
    MatRadioModule, 
    ReactiveFormsModule, 
    MatIconModule,
    MatAutocompleteModule,
    FormsModule,
    MatChipsModule,
    ButtonPrimaryComponent
   ],
  templateUrl: './dialog-habilidades.component.html',
  styleUrl: './dialog-habilidades.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogHabilidadesComponent {
  public formXp: FormGroup;
  
   constructor(private _dialogRef:MatDialogRef<SelectRegisterDialogComponent>, 
       @Inject(MAT_DIALOG_DATA) public data:string, private router: Router, private _fb:FormBuilder){
          this.formXp = this._fb.group({
            habilidades: ['', [Validators.required]],
          });
       }
       
       readonly separatorKeysCodes: number[] = [ENTER, COMMA];
       readonly currentFruit = model('');
       readonly fruits = signal(['']);
       readonly allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
       readonly filteredFruits = computed(() => {
         const currentFruit = this.currentFruit().toLowerCase();
         return currentFruit
           ? this.allFruits.filter(fruit => fruit.toLowerCase().includes(currentFruit))
           : this.allFruits.slice();
       });
     
       readonly announcer = inject(LiveAnnouncer);
     
       add(event: MatChipInputEvent): void {
         const value = (event.value || '').trim();
     
         // Add our fruit
         if (value) {
           this.fruits.update(fruits => [...fruits, value]);
         }
     
         // Clear the input value
         this.currentFruit.set('');
       }
     
       remove(fruit: string): void {
         this.fruits.update(fruits => {
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
         this.fruits.update(fruits => [...fruits, event.option.viewValue]);
         this.currentFruit.set('');
         event.option.deselect();
       }
   
    public closeModal(){
      this._dialogRef.close();
    }
}

