import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataSource } from '../../../../lib/data-source/data-source';
import { Column } from '../../../../lib/data-set/column';

@Component({
  selector: 'ng2-smart-table-title',
  styleUrls: ['./title.component.scss'],
  template: `
    <div *ngIf="column.isSortable" class="ng2-smart-sort-link sort-container" (click)="_sort($event)">
      <span></span>
      <span>{{ column.title }}</span>
      <span class="sort" [ngClass]="{active: currentDirection, desc: currentDirection === 'desc'}">
        <svg width="20" height="16" viewBox="0 0 20 16" fill="#A6AEBD" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1 0H8C8.55 0 9 0.45 9 1C9 1.55 8.55 2 8 2H1C0.45 2 0 1.55 0 1C0 0.45 0.45 0 1 0ZM4 7H8C8.55 7 9 7.45 9 8C9 8.55 8.55 9 8 9H4C3.45 9 3 8.55 3 8C3 7.45 3.45 7 4 7ZM8 14H6C5.45 14 5 14.45 5 15C5 15.55 5.45 16 6 16H8C8.55 16 9 15.55 9 15C9 14.45 8.55 14 8 14ZM17.0002 12.6438L18.3052 11.3838C18.7032 11.0008 19.3362 11.0118 19.7192 11.4088C20.1032 11.8068 20.0922 12.4398 19.6952 12.8228L16.6952 15.7198C16.5002 15.9058 16.2502 15.9998 16.0002 15.9998C15.7442 15.9998 15.4882 15.9028 15.2932 15.7068L12.2932 12.7068C11.9022 12.3168 11.9022 11.6838 12.2932 11.2928C12.6832 10.9028 13.3162 10.9028 13.7072 11.2928L15.0002 12.5858V3.3568L13.6952 4.6158C13.2982 4.9998 12.6652 4.9878 12.2812 4.5908C11.8972 4.1938 11.9082 3.5608 12.3052 3.1768L15.3052 0.2798C15.6992 -0.0962 16.3222 -0.0942 16.7072 0.2928L19.7072 3.2928C20.0972 3.6838 20.0972 4.3168 19.7072 4.7068C19.5122 4.9028 19.2562 4.9998 19.0002 4.9998C18.7442 4.9998 18.4882 4.9028 18.2932 4.7068L17.0002 3.4138V12.6438Z"/>
        </svg>
      </span>
    </div>
    <span class="ng2-smart-sort" *ngIf="!column.isSortable">{{ column.title }}</span>
  `,
})
export class TitleComponent implements OnChanges {

  currentDirection = '';
  @Input() column: Column;
  @Input() source: DataSource;
  @Output() sort = new EventEmitter<any>();

  protected dataChangedSub: Subscription;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.source) {
      if (!changes.source.firstChange) {
        this.dataChangedSub.unsubscribe();
      }
      this.dataChangedSub = this.source.onChanged().subscribe((dataChanges) => {
        const sortConf = this.source.getSort();

        if (sortConf.length > 0 && sortConf[0]['field'] === this.column.id) {
          this.currentDirection = sortConf[0]['direction'];
        } else {
          this.currentDirection = '';
        }

        sortConf.forEach((fieldConf: any) => {

        });
      });
    }
  }

  _sort(event: any) {
    event.preventDefault();
    this.changeSortDirection();
    this.source.setSort([
      {
        field: this.column.id,
        direction: this.currentDirection,
        compare: this.column.getCompareFunction(),
      },
    ]);
    this.sort.emit(null);
  }

  changeSortDirection(): string {
    if (this.currentDirection) {
      const newDirection = this.currentDirection === 'asc' ? 'desc' : 'asc';
      this.currentDirection = newDirection;
    } else {
      this.currentDirection = this.column.sortDirection;
    }
    return this.currentDirection;
  }
}
