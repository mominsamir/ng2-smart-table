import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2CompleterModule } from 'ng2-completer';

import { CellComponent } from './cell.component';
import { CustomEditComponent } from './cell-edit-mode/custom-edit.component';
import { DefaultEditComponent } from './cell-edit-mode/default-edit.component';
import { EditCellComponent } from './cell-edit-mode/edit-cell.component';
import { CheckboxEditorComponent } from './cell-editors/checkbox-editor.component';
import { CompleterEditorComponent } from './cell-editors/completer-editor.component';
import { InputEditorComponent } from './cell-editors/input-editor.component';
import { SelectEditorComponent } from './cell-editors/select-editor.component';
import { TextareaEditorComponent } from './cell-editors/textarea-editor.component';
import { CustomViewComponent } from './cell-view-mode/custom-view.component';
import { TreeParentViewCellComponent } from './cell-view-mode/tree-parent-view-cell.component';
import { EditCellDefault } from './cell-edit-mode/edit-cell-default';
import { DefaultEditor } from './cell-editors/default-editor';
import {TreeChildrenViewCellComponent} from './cell-view-mode/tree-children-view-cell.component';
import {TreeActionViewCellComponent} from './cell-view-mode/tree-action-view-cell.component';

const CELL_COMPONENTS = [
  CellComponent,
  EditCellDefault,
  DefaultEditor,
  CustomEditComponent,
  DefaultEditComponent,
  EditCellComponent,
  CheckboxEditorComponent,
  CompleterEditorComponent,
  InputEditorComponent,
  SelectEditorComponent,
  TextareaEditorComponent,
  CustomViewComponent,
  TreeParentViewCellComponent,
  TreeChildrenViewCellComponent,
  TreeActionViewCellComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2CompleterModule,
  ],
  declarations: [
    ...CELL_COMPONENTS,
  ],
  exports: [
    ...CELL_COMPONENTS,
  ],
})
export class TreeCellModule { }
