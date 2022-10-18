import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { Grid } from '../../../lib/grid';
import { DataSource } from '../../../lib/data-source/data-source';
import { Column } from '../../../lib/data-set/column';

@Component({
	selector: '[ng2-st-thead-filters-row]',
	template: `
    <th *ngIf="isMultiSelectVisible"></th>
    <th *ngIf="isSingleSelectVisible"></th>
    <th ng2-st-add-button *ngIf="showActionColumnLeft"
                          [grid]="grid"
                          (create)="create.emit($event)">
    </th>
    <ng-container *ngFor="let column of getVisibleColumns(grid.getColumns())">
      <th
        *ngIf="isPrimaryColumn(column.id)  && rowCollapsEnabled()"
        [class.ngx-fixed-header]="grid.isTableTypePivot()"
        [style.left]="'0px'"
        [style.zIndex]="11"
        [style.width]="rowCollapsWidth()"
        [style.minWidth]="rowCollapsWidth()">
      </th>
      <th
        class="ng2-smart-th {{ column.id }}"
        [class.ngx-fixed-header]="grid.isTableTypePivot()"
        [style.minWidth]="column.width"
        [style.width]="column.width"
        [style.left]="column.groupBy && 'calc('+grid.getColumnSize(column.id)+')'"
        [style.zIndex]="column.groupBy && 11">
        <ng2-smart-table-filter
          [source]="source"
          [column]="column"
          [inputClass]="filterInputClass"
          (filter)="filter.emit($event)">
        </ng2-smart-table-filter>
      </th>
    </ng-container>
    <th ng2-st-add-button *ngIf="showActionColumnRight  && !grid.isTableTypePivot()"
                          [grid]="grid"
                          [source]="source"
                          (create)="create.emit($event)">
    </th>
  `,
  styles: [
    ` .ngx-fixed-header {
        position: -webkit-sticky;
        position: sticky;
        top: 39px;
        background-color: white;
      }
    `
  ]
})
export class TheadFitlersRowComponent implements OnChanges {

	@Input() grid: Grid;
	@Input() source: DataSource;

	@Output() create = new EventEmitter<any>();
	@Output() filter = new EventEmitter<any>();

	isSingleSelectVisible: boolean;
	isMultiSelectVisible: boolean;
	showActionColumnLeft: boolean;
	showActionColumnRight: boolean;
	filterInputClass: string;

	ngOnChanges() {
		this.isSingleSelectVisible = this.grid.isSingleSelectVisible();
		this.isMultiSelectVisible = this.grid.isMultiSelectVisible();
		this.showActionColumnLeft = this.grid.showActionColumn('left');
		this.showActionColumnRight = this.grid.showActionColumn('right');
		this.filterInputClass = this.grid.getSetting('filter.inputClass');
	}

	getVisibleColumns(columns: Array<Column>): Array<Column> {
		return (columns || []).filter((column: Column) => !column.hide);
	}

	isPrimaryColumn(id: string): boolean {
		return this.grid.getDataSet().getPrimaryPivotColumn() === id
	}

	rowCollapsEnabled(): boolean {
		return this.grid.isRowCollapsEnabled();
	}

	rowCollapsWidth(): string {
		return this.grid.getSetting('rowCollapse.width', '50px');
	}
}
