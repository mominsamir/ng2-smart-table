import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerDataSource } from 'projects/demo/src/app/ngx-smart-table/src/public-api';

@Component({
  selector: 'single-select-server',
  template: `
    <ngx-smart-table [settings]="settings" [source]="source"></ngx-smart-table>
  `,
})
export class SingleSelectComponent {

  settings = {
    keyColumn: 'id',
    selectMode: 'single',
    columns: {
      id: {
        title: 'ID',
      },
      albumId: {
        title: 'Album',
      },
      title: {
        title: 'Title',
      },
      url: {
        title: 'Url',
      },
    },
  };

  source: ServerDataSource;

  constructor(http: HttpClient) {
    this.source = new ServerDataSource(http, { endPoint: 'https://jsonplaceholder.typicode.com/photos' });
  }
}
