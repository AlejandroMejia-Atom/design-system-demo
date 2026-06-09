import { Component, input } from '@angular/core';

@Component({
  selector: 'app-example-page',
  template: `
    <article class="example-page">
      <h1 class="example-page__title">{{ title() }}</h1>
      <p class="example-page__description">{{ description() }}</p>

      @if (checklist().length) {
        <ul class="example-page__checklist" aria-label="What to test">
          <li class="example-page__checklist-title">What to test</li>
          @for (item of checklist(); track item) {
            <li>{{ item }}</li>
          }
        </ul>
      }

      <section class="example-page__demo" aria-label="Live demo">
        <ng-content />
      </section>
    </article>
  `,
  styleUrl: './example-layout.scss',
})
export class ExamplePageComponent {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly checklist = input<string[]>([]);
}
