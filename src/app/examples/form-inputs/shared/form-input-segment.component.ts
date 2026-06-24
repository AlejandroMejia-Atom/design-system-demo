import { Component, input, output } from '@angular/core';
import {
  AtomSegmentComponent,
  AtomSegmentControlComponent,
} from '@atomchat-io/ui-design-system';

@Component({
  selector: 'app-form-input-segment',
  imports: [AtomSegmentControlComponent, AtomSegmentComponent],
  template: `
    <atom-segment-control
      size="xs"
      [value]="value()"
      (valueChange)="onValueChange($event)"
    >
      @for (option of options(); track option) {
        <atom-segment [value]="option">{{ option }}</atom-segment>
      }
    </atom-segment-control>
  `,
})
export class FormInputSegmentComponent {
  readonly options = input.required<readonly string[]>();
  readonly value = input.required<string>();
  readonly valueChange = output<string>();

  onValueChange(next: string | null): void {
    if (next && this.options().includes(next)) {
      this.valueChange.emit(next);
    }
  }
}
