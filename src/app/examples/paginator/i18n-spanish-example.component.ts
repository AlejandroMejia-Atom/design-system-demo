import { Component } from '@angular/core';
import { AtomPaginationComponent, AtomPaginatorIntl } from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from './shared/example-page.component';
import { DEFAULT_PAGE_SIZE_OPTIONS } from './shared/paginator-demo.data';
import { SpanishPaginatorIntl } from './shared/paginator-intl.providers';
import { paginatorExampleById } from './shared/paginator-examples.catalog';

const meta = paginatorExampleById('i18n-spanish');

@Component({
  selector: 'app-i18n-spanish-example',
  imports: [AtomPaginationComponent, ExamplePageComponent],
  providers: [{ provide: AtomPaginatorIntl, useClass: SpanishPaginatorIntl }],
  template: `
    <app-example-page
      [title]="meta.title"
      [description]="meta.description"
      [checklist]="meta.checklist"
    >
      <atom-pagination
        [length]="meta.config!.length"
        [pageSize]="meta.config!.pageSize"
        [pageIndex]="meta.config!.pageIndex"
        [pageSizeOptions]="pageSizeOptions"
      />
    </app-example-page>
  `,
})
export class I18nSpanishExampleComponent {
  protected readonly meta = meta;
  protected readonly pageSizeOptions = [...DEFAULT_PAGE_SIZE_OPTIONS];
}
