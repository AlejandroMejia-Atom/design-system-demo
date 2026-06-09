import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AtomPaginationComponent } from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from './shared/example-page.component';
import { DEFAULT_PAGE_SIZE_OPTIONS } from './shared/paginator-demo.data';
import { paginatorExampleById } from './shared/paginator-examples.catalog';

@Component({
  selector: 'app-paginator-state-example',
  imports: [AtomPaginationComponent, ExamplePageComponent],
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
export class PaginatorStateExampleComponent {
  private readonly route = inject(ActivatedRoute);
  protected readonly meta = paginatorExampleById(this.route.snapshot.data['exampleId'] as string);
  protected readonly pageSizeOptions = [...DEFAULT_PAGE_SIZE_OPTIONS];
}
