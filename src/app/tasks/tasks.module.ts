import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { TaskCreateComponent } from './components/task-create/task-create.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { PrimengCustomModule } from '../shared/primeng/primeng-custom.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TasksComponent,
    TaskCreateComponent,
    TaskEditComponent,
    TaskListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TasksRoutingModule,
    PrimengCustomModule
  ]
})
export class TasksModule { }
