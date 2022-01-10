import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'div-view',
  template: `
    <div >
      Custome Empty Component - {{rowData}}
    </div>
  `,
})
export class DivViewComponent {

  @Input() rowData: any;

}

@Component({
  selector: 'empty-data-view',
  template: `
    <ngx-smart-table [settings]="settings" [source]="data"></ngx-smart-table>
  `,
})
export class EmptyDataComponent implements OnInit {

  settings = {
    emptyDataComponent: DivViewComponent,
    selectMode : 'single',
    columns: {
      id: {
        title: 'ID',
      },
      name: {
        title: 'Full Name',
      },
      username: {
        title: 'User Name',
      },
      email: {
        title: 'Email',
      }
    },
  };

  data = [];

  constructor() {
  }

  ngOnInit() {
  }

}
