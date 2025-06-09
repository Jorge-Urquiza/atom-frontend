import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TaskCreateComponent } from './components/task-create/task-create.component';
import { SessionService } from '../core/services/session.service';
import { Router } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit {
  @ViewChild(TaskListComponent) taskListComponent!: TaskListComponent;
  userMenuItems = [
    {
      label: 'Cerrar sesión',
      icon: 'pi pi-sign-out',
      command: () => this.logout(),
    },
  ];
  public currentUserEmail!: string;
  constructor(
    private router: Router,
    private dialogService: DialogService,
    private sessionService: SessionService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.currentUserEmail = this.sessionService.getEmail();
  }
  logout(): void {
    this.confirmationService.confirm({
      key: 'deleteConfirmationDialog',
      message: '¿Estás seguro(a) de que quieres cerrar sesión?',
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
        localStorage.clear();
        this.router.navigate(['/login']);
      },
      reject: () => {},
    });
  }

  public createTask() {
    const taskReference = this.dialogService.open(TaskCreateComponent, {
      header: 'Crear nueva tarea',
      modal: true,
    });

    taskReference.onClose.subscribe((created) => {
      if (created && this.taskListComponent) {
        this.taskListComponent.loadTasks();
      }
    });
  }
}
