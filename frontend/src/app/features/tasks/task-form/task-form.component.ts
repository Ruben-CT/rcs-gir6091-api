import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TaskService } from '../../../core/services/task.service';
import { TaskStatus } from '../../../core/models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent implements OnInit {
  isEditMode = signal(false);
  loading = signal(false);
  taskId: number | null = null;

  statusOptions: { value: TaskStatus; label: string }[] = [
    { value: 'PENDING', label: 'Pendiente' },
    { value: 'IN_PROGRESS', label: 'En progreso' },
    { value: 'COMPLETED', label: 'Completada' },
  ];

  private fb = inject(FormBuilder);
private taskService = inject(TaskService);
private router = inject(Router);
private route = inject(ActivatedRoute);
private snackBar = inject(MatSnackBar);

form = this.fb.group({
  title: ['', [Validators.required, Validators.maxLength(100)]],
  description: ['', [Validators.required, Validators.maxLength(200)]],
  status: ['PENDING' as TaskStatus],
});

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.isEditMode.set(true);
      this.taskId = Number(idParam);
      this.loadTask(this.taskId);
    }
  }

  loadTask(id: number): void {
    this.loading.set(true);
    this.taskService.findOne(id).subscribe({
      next: (task) => {
        this.form.patchValue({
          title: task.title,
          description: task.description,
          status: task.status,
        });
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.snackBar.open('No se pudo cargar la tarea', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/tasks']);
      },
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const { title, description, status } = this.form.getRawValue();

    if (this.isEditMode() && this.taskId) {
      this.taskService.update(this.taskId, { title: title!, description: description!, status: status! }).subscribe({
        next: () => {
          this.loading.set(false);
          this.snackBar.open('Tarea actualizada correctamente', 'Cerrar', { duration: 2500 });
          this.router.navigate(['/tasks']);
        },
        error: () => {
          this.loading.set(false);
          this.snackBar.open('Error al actualizar la tarea', 'Cerrar', { duration: 3000 });
        },
      });
    } else {
      this.taskService.create({ title: title!, description: description! }).subscribe({
        next: () => {
          this.loading.set(false);
          this.snackBar.open('Tarea creada correctamente', 'Cerrar', { duration: 2500 });
          this.router.navigate(['/tasks']);
        },
        error: () => {
          this.loading.set(false);
          this.snackBar.open('Error al crear la tarea', 'Cerrar', { duration: 3000 });
        },
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/tasks']);
  }
}
