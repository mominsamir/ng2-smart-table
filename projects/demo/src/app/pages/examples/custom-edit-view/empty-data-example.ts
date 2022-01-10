import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'div-view',
  template: `
    <div >
      I am Empty Data Component
    </div>
  `,
})
export class DivViewComponent {

  @Input() rowData: any;


  onClick() {
    alert(this.rowData.name);
  }
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
