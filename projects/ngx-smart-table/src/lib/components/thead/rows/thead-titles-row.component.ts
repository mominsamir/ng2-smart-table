import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { Grid } from '../../../lib/grid';
import { DataSource } from '../../../lib/data-source/data-source';
import { Column } from '../../../lib/data-set/column';

@Component({
  selector: '[ng2-st-thead-titles-row]',
  template: `
    <th ng2-st-checkbox-select-all *ngIf="isMultiSelectVisible"
                                   [grid]="grid"
                                   [source]="source"
                                   [isAllSelected]="isAllSelected"
                                   (click)="selectAllRows.emit($event)">
    </th>
    <th *ngIf="isSingleSelectVisible"></th>
    <th ng2-st-actions-title *ngIf="showActionColumnLeft" [grid]="grid"></th>
    <ng-container *ngFor="let column of getVisibleColumns(grid.getColumns())">
      <th *ngIf="isPrimaryColumn(column.id) && rowCollapsEnabled()"
          [class.ngx-fixed-header]="grid.isTableTypePivot()"
          [style.left]="'0'"
          [style.zIndex]="11"
          [style.width]="rowCollapsWidth()"
          [style.minWidth]="rowCollapsWidth()">
      </th>
      <th class="ng2-smart-th {{ column.id }} {{ column.class }}"
            [class.ngx-fixed-header]="grid.isTableTypePivot()"
            [style.width]="column.width"
            [style.minWidth]="column.width"
            [style.left]="column.groupBy && 'calc('+grid.getColumnSize(column.id)+')'"
            [style.zIndex]="column.groupBy && 11">
          <ng2-st-column-title [source]="source" [column]="column" (sort)="sort.emit($event)"></ng2-st-column-title>
        </th>
    </ng-container>
    <th ng2-st-actions-title *ngIf="showActionColumnRight && !grid.isTableTypePivot()" [grid]="grid"></th>
  `,
  styles: [
    ` .ngx-fixed-header {
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        background-color: white;
      }
    `
  ]
})
export class TheadTitlesRowComponent implements OnChanges {

  @Input() grid: Grid;
  @Input() isAllSelected: boolean;
  @Input() source: DataSource;

  @Output() sort = new EventEmitter<any>();
  @Output() selectAllRows = new EventEmitter<any>();

  isSingleSelectVisible: boolean;
  isMultiSelectVisible: boolean;
  showActionColumnLeft: boolean;
  showActionColumnRight: boolean;


  ngOnChanges() {
    this.isSingleSelectVisible = this.grid.isSingleSelectVisible();
    this.isMultiSelectVisible = this.grid.isMultiSelectVisible();
    this.showActionColumnLeft = this.grid.showActionColumn('left');
    this.showActionColumnRight = this.grid.showActionColumn('right');
  }

  getVisibleColumns(columns: Array<Column>): Array<Column> {
    return (columns || []).filter((column: Column) => !column.hide);
  }

  isPrimaryColumn(id: string): boolean {
    return this.grid.getDataSet().getPrimaryPivotColumn() === id;
  }

  rowCollapsEnabled(): boolean {
		return this.grid.isRowCollapsEnabled();
	}

  rowCollapsWidth(): string {
		return this.grid.getSetting('rowCollapse.width', '50px');
	}
}
