import { Component, input, model } from '@angular/core';
import { AtomToggleComponent } from '@atomchat-io/ui-design-system';

@Component({
  selector: 'app-filter-demo-toggle',
  imports: [AtomToggleComponent],
  template: `
    <atom-toggle
      size="small"
      [label]="label()"
      [checked]="checked()"
      (checkedChange)="checked.set($event)"
    />
  `,
})
export class FilterDemoToggleComponent {
  readonly label = input.required<string>();
  readonly checked = model(false);
}
