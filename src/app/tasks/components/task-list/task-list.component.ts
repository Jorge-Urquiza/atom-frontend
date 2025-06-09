import { Component, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { Table } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';

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

  editTask( task: Task): void {

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
