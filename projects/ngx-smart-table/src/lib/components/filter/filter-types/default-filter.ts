import { Input, Output, EventEmitter, OnDestroy, Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { Column } from '../../../lib/data-set/column';

@Component({
  template: '',
})
export class DefaultFilter implements Filter, OnDestroy {

  delay: number = 1000;
  changesSubscription: Subscription;
  @Input() query: string;
  @Input() inputClass: string;
  @Input() column: Column;
  @Output() filter = new EventEmitter<string>();

  ngOnDestroy() {
    if (this.changesSubscription) {
      this.changesSubscription.unsubscribe();
    }
  }

  setFilter() {
    this.filter.emit(this.query);
  }

  getDefaultValue() {
    if(this.column.hasOwnProperty('filter')) {
      if(this.column.filter && this.column.filter.hasOwnProperty('defaultValue')) {
        return this.column.filter['defaultValue'];
      }
    }
    return undefined;
  }
}

export interface Filter {

  delay?: number;
  changesSubscription?: Subscription;
  query: string;
  inputClass: string;
  column: Column;
  filter: EventEmitter<string>;
}
