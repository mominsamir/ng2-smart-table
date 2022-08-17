import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnChanges,
  AfterViewInit,
  OnDestroy,
  ViewChildren, ViewContainerRef, QueryList, ComponentFactoryResolver, ChangeDetectorRef, SimpleChanges
} from '@angular/core';

import {Cell} from '../../../lib/data-set/cell';
import {Column} from '../../../lib/data-set/column';
import {DataSource} from '../../../lib/data-source/data-source';
import {Subscription} from 'rxjs';
import {Grid} from '../../../lib/grid';

@Component({
  selector: 'tree-table-action-cell-view-mode',
  template: `
    <div [ngSwitch]="cell.getColumn().type">
      <ng-container *ngSwitchCase="'custom'">
        <ng-container *ngIf="cell.getRow().parent && cell.getRow().rowspan">
      <custom-view-component (click)="onExpandAction(cell.getRow())"  [cell]="cell"></custom-view-component>
        </ng-container>
      </ng-container>
      <div *ngSwitchCase="'html'" [innerHTML]="cell.getValue()"></div>
      <div *ngSwitchDefault>
        <ng-container *ngIf="cell.getRow().parent && cell.getRow().rowspan">
          {{ cell.getValue()}}
        </ng-container>
      </div>
    </div>

  `,
})
export class TreeActionViewCellComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() cell: Cell;
  @Input() grid: Grid;
  @Input() source: DataSource;
  @Output() expandRow = new EventEmitter<any>();

  customComponent: any;

  @ViewChildren('iconChild', {read: ViewContainerRef}) iconChild: QueryList<any>;

  constructor(private resolver: ComponentFactoryResolver, private vcRef: ViewContainerRef, private cdr: ChangeDetectorRef) {
  }

  onExpandAction(event: any): boolean {
    console.log(event);
    this.expandRow.next(event);
    return true;
  }

  ngAfterViewInit(): void {
    let cmp = this.cell.getColumn().icon;
    if (cmp && !this.customComponent) {
      this.iconChild.forEach(c => c.clear());
      this.createCustomComponent(cmp);
      this.cdr.detectChanges();
    }
  }

  protected dataChangedSub: Subscription;

  ngOnChanges(changes: SimpleChanges) {
  }

  protected createCustomComponent(iconComponent: any) {
    const componentFactory = this.resolver.resolveComponentFactory(iconComponent);
    if (this.iconChild.length !== 0) {
      this.iconChild.first.createComponent(componentFactory);
    }
  }

  ngOnDestroy(): void {
    if (this.customComponent) {
      this.customComponent.destroy();
    }
  }

}
