import { Component, input, model } from '@angular/core';
import {
  AtomSegmentComponent,
  AtomSegmentControlComponent,
} from '@atomchat-io/ui-design-system';

@Component({
  selector: 'app-filter-demo-segment',
  imports: [AtomSegmentControlComponent, AtomSegmentComponent],
  template: `
    <div class="filter-demo-segment">
      <span class="filter-demo-segment__label typography-caption-regular fg-secondary">
        {{ label() }}
      </span>
      <atom-segment-control
        size="s"
        [value]="active() ? 'on' : 'off'"
        (valueChange)="onValueChange($event)"
      >
        <atom-segment value="on">On</atom-segment>
        <atom-segment value="off">Off</atom-segment>
      </atom-segment-control>
    </div>
  `,
  styles: `
    .filter-demo-segment {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-s);
    }

    .filter-demo-segment__label {
      min-width: 4.5rem;
    }
  `,
})
export class FilterDemoSegmentComponent {
  readonly label = input.required<string>();
  readonly active = model(true);

  onValueChange(value: string | null): void {
    this.active.set(value === 'on');
  }
}
