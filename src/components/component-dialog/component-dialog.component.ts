import { CommonModule } from '@angular/common';
import { Component, Input, signal, WritableSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { ɵEmptyOutletComponent } from "@angular/router";

@Component({
  selector: 'app-component-dialog',
  imports: [
    CommonModule,
    ButtonModule,
    InputSwitchModule,
    ReactiveFormsModule,
    DialogModule,
    FloatLabelModule,
    InputTextModule,
],
    templateUrl: './component-dialog.component.html',
  styleUrl: './component-dialog.component.scss',
})
export class ComponentDialogComponent {
  @Input() visible: WritableSignal<boolean> = signal(false);
  isLoading = signal(false);
  @Input() imageUrl: string = '';
  @Input() description: string = 'hi';
}
