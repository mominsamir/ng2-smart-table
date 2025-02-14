import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'div-view',
  template: `
    <div >
      <table>
        <thead>
          <tr>
            <th>Id</th>          
            <th>Name</th>
            <th>Email</th>
            <th>User Name</th>
            <th>inner Action</th>
 
            </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ rowData?.id }}</td>          
            <td>{{ rowData?.name }}</td>
            <td>{{ rowData?.email }}</td>
            <td>{{ rowData?.username }}</td>
            <td><button (click)="onClick()">click me</button></td>
          </tr>
        </tbody>        
      </table>
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
  selector: 'icon',
  template: `
    <svg width="5" height="5">
      <circle cx='5' cy='5' r='4' stroke='green' stroke-width='1' fill='yellow'></circle>
    </svg>  
  `,
})
export class IconComponent {

}

@Component({
  selector: 'row-expand-view',
  template: `
    <ngx-smart-table [settings]="settings" [source]="data"></ngx-smart-table>
  `,
})
export class RowExpandComponent implements OnInit {

  settings = {
    expandedRowComponent: DivViewComponent,
    columns: {
      id: {
        title: 'ID',
        icon :IconComponent
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

  data = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz'
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv'
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      username: 'Samantha',
      email: 'Nathan@yesenia.net'
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      username: 'Karianne',
      email: 'Julianne.OConner@kory.org'
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      username: 'Kamren',
      email: 'Lucio_Hettinger@annie.ca'
    },
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
