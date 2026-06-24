import { JsonPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AtomButtonComponent } from '@atomchat-io/ui-design-system';

@Component({
  selector: 'app-form-control-readout',
  imports: [JsonPipe, AtomButtonComponent],
  template: `
    <div class="form-control-readout">
      <p class="form-control-readout__line typography-caption-regular">
        {{ valueLabel() }}:
        <code>{{ displayValue() }}</code>
      </p>
      <p class="form-control-readout__line typography-caption-regular">
        Status: <code>{{ control().status }}</code>
        · Valid: <code>{{ control().valid }}</code>
        · Touched: <code>{{ control().touched }}</code>
        · Dirty: <code>{{ control().dirty }}</code>
        · Disabled: <code>{{ control().disabled }}</code>
      </p>
      @if (control().errors) {
        <p class="form-control-readout__line typography-caption-regular">
          Errors: <code>{{ control().errors | json }}</code>
        </p>
      }
      <div class="form-control-readout__actions">
        <button atom-button="tertiary" size="s" type="button" (click)="markTouched()">
          Mark touched
        </button>
        <button atom-button="tertiary" size="s" type="button" (click)="markDirty()">
          Mark dirty
        </button>
        <button atom-button="tertiary" size="s" type="button" (click)="reset()">
          Reset
        </button>
        @if (sampleValue() !== undefined) {
          <button atom-button="secondary" size="s" type="button" (click)="patchSample()">
            Patch sample
          </button>
        }
      </div>
    </div>
  `,
  styleUrl: './example-layout.scss',
})
export class FormControlReadoutComponent {
  readonly control = input.required<FormControl<unknown>>();
  readonly valueLabel = input('Value');
  readonly formatValue = input<(value: unknown) => string>();
  readonly sampleValue = input<unknown>(undefined);

  displayValue(): string {
    const value = this.control().value;
    const format = this.formatValue();
    if (format) {
      return format(value);
    }
    if (value === null || value === undefined || value === '') {
      return '—';
    }
    return String(value);
  }

  markTouched(): void {
    this.control().markAsTouched();
  }

  markDirty(): void {
    this.control().markAsDirty();
  }

  reset(): void {
    this.control().reset();
  }

  patchSample(): void {
    const sample = this.sampleValue();
    if (sample !== undefined) {
      this.control().setValue(sample);
    }
  }
}
