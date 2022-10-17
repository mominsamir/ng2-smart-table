import {
        AfterViewInit,
        ChangeDetectionStrategy,
        Component,
        ComponentFactoryResolver,
        Input,
        OnDestroy,
        ViewChild,
        ViewContainerRef,
        ChangeDetectorRef,
} from '@angular/core';
import { Cell } from '../../../lib/data-set/cell';
import { Column } from '../../../lib/data-set/column';
import { Row } from '../../../lib/data-set/row';
import { Grid } from '../../../lib/grid';

@Component({
    selector: 'ng2-st-row-expand-collapse',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <a href="#" class="ng2-smart-action ng2-smart-action-row-expand-collaps"
         (click)="onRowExpandCollapse($event)">
         <div class="ngx-expand-icon" >
            <ng-container #vc></ng-container>
         </div>
        </a>
    `,
})
export class TRowExpandCollapsComponent implements AfterViewInit, OnDestroy {

    @Input() grid: Grid;
    @Input() row: Row;
    @Input() column: Column;
    @Input() cell: Cell;
    @Input() expanded = false;
    isExpanded: boolean;

    @ViewChild('vc', { read: ViewContainerRef }) vc: ViewContainerRef;

    constructor(private resolver: ComponentFactoryResolver, private cd: ChangeDetectorRef) { }


    ngAfterViewInit(): void {
        // create icon component and attach to dom
        const cmp = this.grid.getSetting('rowCollapse.iconComponent');
        if (cmp) {
            const factory = this.resolver.resolveComponentFactory(cmp);
            const compoRef = this.vc.createComponent(factory);
            Object.assign(compoRef.instance, {}, {
                rowData: this.row,
                expanded: this.expanded
            });

            this.cd.detectChanges();
        }
        // check default setting to expand all rows or not
        if (this.expanded) { this.defaultVisibility(); }
    }


    onRowExpandCollapse(event: any) {
        event.preventDefault();
        event.stopPropagation();
        this.defaultVisibility();
    }

    defaultVisibility( ) {
        const isValidFunction = this.grid.onPivotRowCollpse() instanceof Function;

        const additionalFilterColumn = this.grid.getSetting('rowCollapse.excludeOnHideColumn');

        let rows = [];

        if (this.grid.isRowCollapsEnabled() && additionalFilterColumn && isValidFunction) {
            rows = this.grid.getRows().filter(r =>
                r.getCell(this.column).getValue() === this.cell.getValue()
                && this.grid.onPivotRowCollpse()
                        .call(null, r.getCellById(additionalFilterColumn).getValue(), additionalFilterColumn)
            );
        } else {
            rows = this.grid.getRows().filter(r =>
                r.getCell(this.column).getValue() === this.cell.getValue());
        }

        rows.forEach(r => r.getCells().forEach((c: Cell) => c.toogleVisibility()));
    }

    ngOnDestroy(): void {
        this.vc.clear();
    }
}
