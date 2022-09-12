import {Component, Input, Output, EventEmitter} from '@angular/core';

import {Grid} from '../../lib/grid';
import {Cell} from '../../lib/data-set/cell';
import {Row} from '../../lib/data-set/row';

@Component({
  selector: 'ng2-smart-tree-table-cell',
  template: `

    <ng-container *ngIf="cell.getGroupBy() else defaultCell">
<!--      expandAction-->
      <tree-table-action-cell-view-mode *ngIf="!isInEditing && cell.getId() === 'expandAction' else parent" [cell]="cell" [grid]="grid"
                                        (expandRow)="expandRow($event)"></tree-table-action-cell-view-mode>
      <ng-template #parent>
<!--        id-->
        <tree-table-parent-cell-view-mode *ngIf="!isInEditing" [cell]="cell"></tree-table-parent-cell-view-mode>
      </ng-template>
    </ng-container>
    <ng-template #defaultCell>
      <tree-table-cell-view-mode *ngIf="!isInEditing" [cell]="cell"></tree-table-cell-view-mode>
    </ng-template>

    <tree-table-cell-edit-mode *ngIf="isInEditing" [cell]="cell"
                               [inputClass]="inputClass"
                               (edited)="onEdited($event)">
    </tree-table-cell-edit-mode>
  `,
})
export class CellComponent {
  @Input() grid: Grid;
  @Input() row: Row;
  @Input() editConfirm: EventEmitter<any>;
  @Input() createConfirm: EventEmitter<any>;
  @Input() isNew: boolean;
  @Input() cell: Cell;
  @Input() inputClass: string = '';
  @Input() mode: string = 'inline';
  @Input() isInEditing: boolean = false;

  @Output() edited = new EventEmitter<any>();

  onEdited(event: any) {
    if (this.isNew) {
      this.grid.create(this.grid.getNewRow(), this.createConfirm);
    } else {
      this.grid.save(this.row, this.editConfirm);
    }
  }

  expandRow(event: any) {
    this.grid.expandTreeRows(event.getData().id);

  }
}
