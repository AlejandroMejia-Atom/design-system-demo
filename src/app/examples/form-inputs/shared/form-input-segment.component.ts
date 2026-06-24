import { Component, computed, input, output } from '@angular/core';
import {
  AtomSegmentComponent,
  AtomSegmentControlComponent,
  type AtomSegmentSize,
} from '@atomchat-io/ui-design-system';

@Component({
  selector: 'app-form-input-segment',
  imports: [AtomSegmentControlComponent, AtomSegmentComponent],
  template: `
    <atom-segment-control
      [size]="segmentSize()"
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

  /** DS warns when size='xs' is used with 5+ segments — bump to 's' automatically. */
  protected readonly segmentSize = computed<AtomSegmentSize>(() =>
    this.options().length >= 5 ? 's' : 'xs',
  );

  onValueChange(next: string | null): void {
    if (next && this.options().includes(next)) {
      this.valueChange.emit(next);
    }
  }
}
