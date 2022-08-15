import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Ng2SmartTreeTableTbodyComponent } from './tbody.component';
import { TbodyCreateCancelComponent } from './cells/create-cancel.component';
import { TbodyEditDeleteComponent } from './cells/edit-delete.component';
import { TbodyCustomComponent } from './cells/custom.component';
import { TbodyExpandRowComponent } from './cells/expand.component';
import {TreeCellModule} from '../tree-cell/cell.module';
import {CellModule} from '../cell/cell.module';

const TBODY_COMPONENTS = [
  TbodyCreateCancelComponent,
  TbodyEditDeleteComponent,
  TbodyCustomComponent,
  TbodyExpandRowComponent,
  Ng2SmartTreeTableTbodyComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TreeCellModule,
    CellModule,
  ],
  declarations: [
    ...TBODY_COMPONENTS,
  ],
  exports: [
    ...TBODY_COMPONENTS,
  ],
})
export class TreeTBodyModule { }
