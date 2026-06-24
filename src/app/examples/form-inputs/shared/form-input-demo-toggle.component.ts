import { Component, input, output } from '@angular/core';
import { AtomToggleComponent } from '@atomchat-io/ui-design-system';

@Component({
  selector: 'app-form-input-demo-toggle',
  imports: [AtomToggleComponent],
  template: `
    <atom-toggle
      size="small"
      [label]="label()"
      [checked]="checked()"
      (checkedChange)="checkedChange.emit($event)"
    />
  `,
})
export class FormInputDemoToggleComponent {
  readonly label = input.required<string>();
  readonly checked = input(false);
  readonly checkedChange = output<boolean>();
}
