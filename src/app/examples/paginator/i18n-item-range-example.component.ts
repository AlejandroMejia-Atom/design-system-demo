import { Component } from '@angular/core';
import { AtomPaginationComponent, AtomPaginatorIntl } from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from './shared/example-page.component';
import { DEFAULT_PAGE_SIZE_OPTIONS } from './shared/paginator-demo.data';
import { ItemRangePaginatorIntl } from './shared/paginator-intl.providers';
import { paginatorExampleById } from './shared/paginator-examples.catalog';

const meta = paginatorExampleById('i18n-item-range');

@Component({
  selector: 'app-i18n-item-range-example',
  imports: [AtomPaginationComponent, ExamplePageComponent],
  providers: [{ provide: AtomPaginatorIntl, useClass: ItemRangePaginatorIntl }],
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
export class I18nItemRangeExampleComponent {
  protected readonly meta = meta;
  protected readonly pageSizeOptions = [...DEFAULT_PAGE_SIZE_OPTIONS];
}
