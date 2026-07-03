import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TaskService } from '../../../core/services/task.service';
import { AuthService } from '../../../core/services/auth.service';
import { Task } from '../../../core/models/task.model';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTooltipModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  tasks = signal<Task[]>([]);
  loading = signal(true);
  displayedColumns = ['title', 'description', 'status', 'createdAt', 'actions'];

  constructor(
    private taskService: TaskService,
    public authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading.set(true);
    this.taskService.findAll().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.snackBar.open('Error al cargar las tareas', 'Cerrar', { duration: 3000 });
      },
    });
  }

  edit(task: Task): void {
    this.router.navigate(['/tasks', task.id, 'edit']);
  }

  remove(task: Task): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar tarea',
        message: `¿Seguro que quieres eliminar "${task.title}"? Esta acción no se puede deshacer.`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;

      this.taskService.delete(task.id).subscribe({
        next: () => {
          this.snackBar.open('Tarea eliminada', 'Cerrar', { duration: 2500 });
          this.loadTasks();
        },
        error: () => {
          this.snackBar.open('Error al eliminar la tarea', 'Cerrar', { duration: 3000 });
        },
      });
    });
  }

  statusColor(status: string): string {
    switch (status) {
      case 'COMPLETED':
        return 'primary';
      case 'IN_PROGRESS':
        return 'accent';
      default:
        return '';
    }
  }

  statusLabel(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'Pendiente';
      case 'IN_PROGRESS':
        return 'En progreso';
      case 'COMPLETED':
        return 'Completada';
      default:
        return status;
    }
  }
}
