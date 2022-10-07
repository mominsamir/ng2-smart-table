import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";
import { Cell } from "../../../lib/data-set/cell";
import { Column } from "../../../lib/data-set/column";
import { Row } from "../../../lib/data-set/row";
import { Grid } from "../../../lib/grid";

@Component({
    selector: 'ng2-st-row-expand-collaps',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
      <a href="#" class="ng2-smart-action ng2-smart-action-row-expand-collaps"
          [innerHTML]="iconComponent" (click)="onRowExpandCollaps($event)"></a>
    `,
  })
  export class TRowExpandCollapsComponent implements OnChanges {
  
    @Input() grid: Grid;
    @Input() row: Row;
    @Input() primaryField: string;
    @Input() column: Column;
    @Input() cell: Cell;

    @Output() onExpandRow = new EventEmitter<any>();

    iconComponent: string;

    constructor(){
    }

    onRowExpandCollaps(event: any) {
        event.preventDefault();
        event.stopPropagation();

        let rows = []
        const column = this.grid.getSetting('actions.rowCollaps').filterColumn;
        const value = this.grid.getSetting('actions.rowCollaps').filterValue;

        if(this.grid.isRowCollapsEnabled() && column !== undefined) {
            rows = this.grid.getRows().filter(r=> 
                r.getCell(this.column).getValue() === this.cell.getValue() 
                && r.getCellById(column).getValue() !== value
            );
        } else {
            rows = this.grid.getRows().filter(r=> 
                r.getCell(this.column).getValue() === this.cell.getValue());
        }

        rows.forEach(r=> r.getCells().forEach(c =>  c.toogleVisibility()));
    }
    
    ngOnChanges(){
        this.iconComponent = this.grid.getSetting('actions.rowCollaps').iconComponent;
    }
  }