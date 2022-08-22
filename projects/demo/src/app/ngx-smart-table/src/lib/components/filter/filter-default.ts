import { Output, EventEmitter, Input, Component } from '@angular/core';

import { Column } from '../../lib/data-set/column';
import { DataSource } from '../../lib/data-source/data-source';

@Component({
  template: '',
})
export class FilterDefault {

  @Input() column: Column;
  @Input() source: DataSource;
  @Input() inputClass: string = '';

  @Output() filter = new EventEmitter<any>();

  query: string = '';

  onFilter(query: string) {
    const filter = {
      field: this.column.id,
      search: query,
      filter: this.column.getFilterFunction(),
      operator : this.column.filterOperator,
    }
    this.source.addFilter(filter);
    this.filter.emit(filter);
  }
}
