import {Component, Input, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';

import { Cell } from '../../../lib/data-set/cell';

@Component({
  selector: 'table-cell-view-mode',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [ngSwitch]="cell.getColumn().type">
        <custom-view-component *ngSwitchCase="'custom'" [cell]="cell"></custom-view-component>
      <custom-action-component *ngSwitchCase="'custom-action'" [cell]="cell" (onExpandRow)="this.onExpandRow.emit(this.cell)"></custom-action-component>
        <div *ngSwitchCase="'html'" [innerHTML]="cell.getValue()"></div>
        <div *ngSwitchDefault>{{ cell.getValue()}}</div>
    </div>
    `,
})
export class ViewCellComponent {

  @Input() cell: Cell;
  @Output() onExpandRow = new EventEmitter<any>();
}
