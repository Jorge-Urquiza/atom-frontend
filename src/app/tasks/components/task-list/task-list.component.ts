import { Component, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { TaskEditComponent } from '../task-edit/task-edit.component';
import { ChangeDetectorRef } from '@angular/core';

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
    private messageService: MessageService,
    private dialogService: DialogService,
    private cdr: ChangeDetectorRef,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  public loadTasks(): void {
    this.taskService.getUserTasks().subscribe({
      next: (res) => {
        this.tasks = res.data;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las tareas.',
        });
      }
    });
  }
  public onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  editTask(task: Task): void {
    const ref = this.dialogService.open(TaskEditComponent, {
      header: 'Editar tarea',
      modal: true,
      width: '500px',
      data: { task },
    });

    ref.onClose.subscribe((updated) => {
      if (updated) this.loadTasks();
    });
  }

  confirmDelete(event: Event, task: Task) {
    this.confirmationService.confirm({
      key: 'confirmationDialog',
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
        this.delete(task);
      },
      reject: () => {},
    });
  }

  confirmStatusChange(event: MouseEvent, task: Task): void {
    event.preventDefault();
    const newValue = !task.completed;
    this.confirmationService.confirm({
      key: 'confirmationDialog',
      header: 'Confirmar cambio de estado',
      message: `¿Deseas marcar esta tarea como 'completada'?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'p-button-sucess p-button-text',
      rejectButtonStyleClass: 'p-button-danger p-button-text',
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      defaultFocus: 'none',
      accept: () => {
        this.taskService
          .updateTask(task.id!, { completed: newValue })
          .subscribe({
            next: () => {
              task.completed = newValue;
              this.loadTasks();
              this.messageService.add({
                severity: 'success',
                summary: 'Tarea actualizada',
                detail: `Estado: 'Completada' `,
              });
            },
            error: () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo actualizar el estado de la tarea.',
              });
            },
          });
      },
    });
  }

  public delete(task: Task) {
    if (!task.id) return;
    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.loadTasks();
        this.messageService.add({
          severity: 'success',
          summary: 'Tarea eliminada',
          detail: `La tarea "${task.title}" fue eliminada exitosamente.`,
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al eliminar',
          detail: `No se pudo eliminar la tarea "${task.title}". Intenta nuevamente.`,
        });
      },
    });
  }
}
