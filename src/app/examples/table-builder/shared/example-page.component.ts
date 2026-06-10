import { Component, input } from '@angular/core';

@Component({
  selector: 'app-example-page',
  template: `
    <article class="example-page">
      <h1 class="example-page__title typography-heading-bold mb-xs">{{ title() }}</h1>
      <p class="example-page__description typography-body-regular fg-secondary mb-m">
        {{ description() }}
      </p>

      @if (checklist().length) {
        <ul class="example-page__checklist mb-l p-m bg-secondary" aria-label="What to test">
          <li class="example-page__checklist-title typography-label-bold fg-secondary mb-s">
            What to test
          </li>
          @for (item of checklist(); track item) {
            <li class="example-page__checklist-item typography-caption-regular fg-primary">
              {{ item }}
            </li>
          }
        </ul>
      }

      <section class="example-page__demo p-m bg-primary" aria-label="Live demo">
        <ng-content />
      </section>

      @if (codeSnippet()) {
        <section class="example-page__snippet mt-m p-m bg-secondary" aria-label="Example code">
          <h2 class="example-page__snippet-title typography-label-bold fg-secondary mb-s">
            Example code
          </h2>
          <pre class="example-page__code typography-caption-regular fg-primary">{{ codeSnippet() }}</pre>
        </section>
      }
    </article>
  `,
  styleUrl: './example-layout.scss',
})
export class ExamplePageComponent {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly checklist = input<string[]>([]);
  readonly codeSnippet = input<string>('');
}
