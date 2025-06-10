import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.scss',
})
export class TaskEditComponent implements OnInit {
  public editFormTask!: FormGroup;
  public loading = false;
  private taskId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private messageService: MessageService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {}
  ngOnInit(): void {
    const task = this.config.data?.task as Task;

    if (!task) {
      this.ref.close();
      return;
    }

    this.taskId = task.id!;
    this.editFormTask = this.formBuilder.group({
      title: [task.title, Validators.required],
      description: [task.description, Validators.required],
    });
  }
  get title() {
    return this.editFormTask.get('title');
  }
  get description() {
    return this.editFormTask.get('description');
  }
  public onSubmit(): void {
    if (this.editFormTask.invalid) {
      this.editFormTask.markAllAsTouched();
      return;
    }
    const task: Task = this.editFormTask.value;
    this.loading = true;
    this.taskService
      .updateTask(this.taskId, task)
      .subscribe({
        next: () => {
          this.loading = false;
          this.messageService.add({
            severity: 'success',
              summary: 'Tarea actualizada',
            detail: `La tarea "${task.title}" se actualizo correctamente.`
          });
          this.ref.close(true);
        },
        error: () => {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error al actualizar',
          });
        },
      });
  }
  public onCancel(): void {
    this.ref.close(false);
  }
}
