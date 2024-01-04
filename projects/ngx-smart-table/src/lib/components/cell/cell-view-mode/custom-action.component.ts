import {
  Component,
  Input,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
  OnInit,
  OnDestroy, Output, EventEmitter,
} from '@angular/core';

import { Cell } from '../../../lib/data-set/cell';
import { ViewCell } from './view-cell';
import {CustomViewComponent} from './custom-view.component';

@Component({
  selector: 'custom-action-component',
  template: `
    <div class="custom-action" style="cursor: pointer" (click)="onActionEvent($event)">
    <ng-template #dynamicTarget></ng-template>
    </div>
  `,
})
export class CustomActionComponent extends CustomViewComponent {
  @Output() onExpandRow = new EventEmitter<any>();
  constructor(public resolver: ComponentFactoryResolver) {
    super(resolver);
  }
  onActionEvent(event: any) {
    switch (this.cell.getColumn().action) {
      case 'expand':
        event.preventDefault();
        event.stopPropagation();
        this.onExpandRow.emit(this.cell);
        break;
    }
  }
}
