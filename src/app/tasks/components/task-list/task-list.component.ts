import { Component, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { Table } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { TaskEditComponent } from '../task-edit/task-edit.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  @ViewChild('table') table: any;
  public tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getUserTasks().subscribe({
      next: (res) => {
        this.tasks = res.data;
      },
    });
  }
  public onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  editTask(task: Task): void {
    const ref = this.dialogService.open(TaskEditComponent, {
      header: 'Editar tarea',
      modal: true,
      data: { task }
    });

    ref.onClose.subscribe((updated) => {
      if (updated ) this.loadTasks();
    });
  }
  confirmDelete(event: Event, task: Task) {
    this.confirmationService.confirm({
      key: 'deleteConfirmationDialog',
      target: event.target as EventTarget,
      message: '¿Estás seguro(a) de que quieres eliminar esta tarea?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'p-button-sucess p-button-text',
      rejectButtonStyleClass: 'p-button-danger p-button-text',
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      defaultFocus: 'none',
      accept: () => {
        // this.delete(task);
      },
      reject: () => {},
    });

  }

  toggleTaskStatus(task: Task): void {

  }
}
