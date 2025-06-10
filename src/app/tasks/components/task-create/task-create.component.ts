import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.scss',
})
export class TaskCreateComponent implements OnInit {
  public createFormTask!: FormGroup;
  public loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private taskService: TaskService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.createFormTask = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.createFormTask.invalid) {
      this.createFormTask.markAllAsTouched();
      return;
    }

    const task: Task = this.createFormTask.value;
    this.loading = true;
    this.taskService.createTask(task).subscribe({
      next: () => {
        this.loading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Tarea creada',
          detail: `La tarea "${task.title}" fue creada exitosamente.`,
        });
        this.ref.close(true);
      },
      error: () => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error al crear la tarea',
        });
      },
    });
  }
  public onCancel(): void {
    this.ref.close(false);
  }
}
