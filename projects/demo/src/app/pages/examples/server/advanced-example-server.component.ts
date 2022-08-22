import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerDataSource } from 'projects/demo/src/app/ngx-smart-table/src/public-api';

@Component({
  selector: 'advanced-example-server',
  template: `
    <ngx-smart-table [settings]="settings" [source]="source"></ngx-smart-table>
  `,
})
export class AdvancedExampleServerComponent {

  settings = {
    keyColumn: 'id',
    selectMode: 'multi',
    columns: {
      id: {
        title: 'ID',
        operator : '',
      },
      albumId: {
        title: 'Album',
        filterOperator : 'EQUAL',
      },
      title: {
        title: 'Title',
        filterOperator : 'EQUAL',
      },
      url: {
        title: 'Url',
        operator : 'EQUAL',
      },
    },
  };

  source: ServerDataSource;

  constructor(http: HttpClient) {
    this.source = new ServerDataSource(http, { endPoint: 'https://jsonplaceholder.typicode.com/photos' });
  }
}
