import { Component, input } from '@angular/core';

@Component({
  selector: 'app-filter-state-readout',
  template: `
  <pre class="filter-state-readout" aria-label="Filter state">{{ lines().join('\n') }}</pre>
  `,
  styleUrl: './example-layout.scss',
})
export class FilterStateReadoutComponent {
  readonly lines = input.required<string[]>();
}
