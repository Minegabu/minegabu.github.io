import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  QueryList,
  signal,
  ViewChild,
  ViewChildren,
  Input
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-two-factor-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './two-factor-auth.component.html',
  styleUrl: './two-factor-auth.component.scss',
})
export class TwoFactorAuthComponent implements AfterViewInit {
  @ViewChildren('inputs') myElements!: QueryList<ElementRef>;
  @ViewChild('border') element!: ElementRef;
  @ViewChild('container') container!: ElementRef;
  @Output() codeComplete = new EventEmitter<string>(); // Emit event when code is complete
  formGroup!: FormGroup;
  code = signal<string>('');
  @Input() autoFocusLastInput = false;
  ngAfterViewInit() {
    setTimeout(() => {
      this.myElements.get(0)?.nativeElement.focus();
    }, 100);
  }

  getControl(key: string): FormControl {
    return this.formGroup['controls'][key] as FormControl;
  }

  focus(inputId: number): void {
    const additionalTranslate = inputId >= 3 ? 33 : 0;
    this.element.nativeElement.style.transform = `translateX(${56 * (inputId + 1) + additionalTranslate}px)`;
  }

  moveFocus(event: InputEvent, nextInputId: number, prevInputId: number): void {
    const previousElement = this.myElements.get(5);
    if (event.inputType === 'insertFromPaste') {
      event.preventDefault();
      if (event.data) {
        if (
          isNaN(parseInt(event.data)) ||
          parseInt(event.data).toString().length < event.data.length
        ) {
          this.element.nativeElement.style.borderColor = 'red';
          this.container.nativeElement.classList.add('wrong');
          setTimeout(() => {
            this.container.nativeElement.classList.remove('wrong');
            this.element.nativeElement.style.borderColor = '#007bff';
          }, 500);
          return;
        }
        for (let i = 0; i < event.data.length; i++) {
          const inputElement = this.myElements.get(i);
          if (inputElement) {
            inputElement.nativeElement.value = event.data[i];
            inputElement.nativeElement.style.color = '#000000';
          }
        }
        this.myElements.get(5)?.nativeElement.focus();
        this.getFormValue();
      }
    } else {
      if (!event.data && event.inputType !== 'deleteContentBackward') {
        if (event.inputType === 'insertText') {
          event.preventDefault();
        }
        return;
      }
      if (previousElement && nextInputId === 6) {
        if (event.inputType === 'insertText') {
          event.preventDefault();
        }
        previousElement.nativeElement.style.color = '#000000';
      }
      if (event.inputType === 'deleteContentBackward' && prevInputId !== 6) {
        if (event.inputType === 'deleteContentBackward') {
          event.preventDefault();
        }
        (event.target as HTMLInputElement).value = '';
        this.myElements.get(prevInputId)?.nativeElement.focus();
        const previousElement = this.myElements.get(nextInputId);
        if (previousElement) {
          previousElement.nativeElement.classList.remove('text-animation');
          previousElement.nativeElement.style.color = 'rgb(226,226,226)';
        }
        this.element.nativeElement.style.borderColor = '#007bff';
        const additionalTranslate = prevInputId >= 3 ? 33 : 0;
        this.element.nativeElement.style.transform = `translateX(${56 * (prevInputId + 1) + additionalTranslate}px)`;
      } else if (
        typeof event.data == 'string' &&
        nextInputId !== 0 &&
        event.inputType !== 'deleteContentBackward' &&
        !isNaN(parseInt(event.data)) &&
        nextInputId < 6
      ) {
        (event.target as HTMLSpanElement).classList.add('text-animation');
        setTimeout(() => {
          (event.target as HTMLSpanElement).classList.remove('text-animation');
        }, 500);
        (event.target as HTMLInputElement).value = event.data;
        if (event.inputType === 'insertText') {
          event.preventDefault();
        }
        this.myElements.get(nextInputId)?.nativeElement.focus();
        this.element.nativeElement.style.borderColor = '#007bff';
        const previousElement = this.myElements.get(nextInputId - 1);
        if (previousElement) {
          previousElement.nativeElement.style.color = '#000000';
        }
        const additionalTranslate = nextInputId >= 3 ? 33 : 0;
        this.element.nativeElement.style.transform = `translateX(${56 * (nextInputId + 1) + additionalTranslate}px)`;
      } else if (
        nextInputId === 6 &&
        event.inputType !== 'deleteContentBackward' &&
        event.data &&
        !isNaN(parseInt(event.data))
      ) {
        if (event.inputType === 'insertText') {
          event.preventDefault();
        }
        (event.target as HTMLInputElement).value = event.data;
      } else if (event.inputType === 'deleteContentBackward') {
        (event.target as HTMLInputElement).value = '';
        const previousElement = this.myElements.get(nextInputId - 1);
        if (previousElement) {
          previousElement.nativeElement.classList.remove('text-animation');
          previousElement.nativeElement.style.color = 'rgb(226,226,226)';
        }
      } else if (
        event.inputType !== 'deleteContentBackward' &&
        event.data &&
        isNaN(parseInt(event.data))
      ) {
        if (event.inputType === 'insertText') {
          event.preventDefault();
        }
        (event.target as HTMLInputElement).value = '';
        this.element.nativeElement.style.borderColor = 'red';
        this.container.nativeElement.classList.add('wrong');
        setTimeout(() => {
          this.container.nativeElement.classList.remove('wrong');
          this.element.nativeElement.style.borderColor = '#007bff';
        }, 500);
      }
    }
  }

  getFormValue(): string {
    let code = '';
    this.myElements.forEach((element) => {
      code += element.nativeElement.value;
    });

    if (code.length === 6) {
      this.myElements.forEach((element) => {
        element.nativeElement.disabled = true;
      });

      setTimeout(() => {
        this.myElements.forEach((element) => {
          element.nativeElement.disabled = false;
        });
      }, 1000);

      if (this.autoFocusLastInput) {
        setTimeout(() => {
          this.myElements.get(5)?.nativeElement.focus();
        }, 1001);
      }

      this.codeComplete.emit(code);
      return code;
    }
    return code;
  }
}
