import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TaskCreateComponent } from './components/task-create/task-create.component';
import { SessionService } from '../core/services/session.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit{
   userMenuItems = [
    {
      label: 'Cerrar sesión',
      icon: 'pi pi-sign-out',
      command: () => this.logout(),
    },
  ];
  public currentUserEmail!: string;
  private ref: DynamicDialogRef | undefined;
  constructor(
    private router: Router,
    private dialogService: DialogService,
    private sessionService: SessionService,
    private confirmationService: ConfirmationService,
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


   public openCreateEmployeeModal() {
    this.ref = this.dialogService.open(TaskCreateComponent, {
      header: 'Crear trabajador(a)',
      width: '50vw',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    });

    this.ref.onClose.subscribe((some) => {
      // if (some) {
      //   this.resetFilters();
      //   this.params = this.getParamsForFilters();
      //   this.loadData();
      //   this.messageService.add({
      //     severity: 'success',
      //     summary: 'Éxito!',
      //     detail: 'Trabajador(a) creado exitosamente!',
      //   });
      // } else {
      // }
    });
  }

}
