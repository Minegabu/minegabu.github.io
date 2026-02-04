import { CommonModule } from '@angular/common';
import { Component, Input, signal, WritableSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-dialog-component',
  imports: [
    CommonModule,
    ButtonModule,
    InputSwitchModule,
    ReactiveFormsModule,
    DialogModule,
    FloatLabelModule,
    InputTextModule,
  ],
    templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  @Input() visible: WritableSignal<boolean> = signal(false);
  isLoading = signal(false);
@Input() imageUrl: string = '';
@Input() description: string = '';
@Input() mainDescription: string = '';

}
