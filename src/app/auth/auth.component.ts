import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LoginRequest } from './models/login-request';
import { UserService } from '../shared/services/users.service';
import { SessionService } from '../core/services/session.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  public loginForm!: FormGroup;
  public loading = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private sessionService: SessionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  public onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    const payload: LoginRequest = this.loginForm.value;

    this.attemptLogin(payload);
  }

  private attemptLogin(payload: LoginRequest): void {
    this.authService.login(payload).subscribe({
      next: (res) => {
        const token: string = res.data.token;
        this.storeTokenAndNavigate(token, payload);
      },
      error: (error) => {
        this.loading = false;
        console.log('confirmation:', error);
        if (error?.error?.message === 'User not found') {
          this.confirmUserCreation(payload.email);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Ocurrió un error inesperado.',
          });
        }
      },
    });
  }

  private confirmUserCreation(email: string): void {
    this.confirmationService.confirm({
      message: `El usuario no se encuentra registrado. ¿Deseas crear una cuenta?`,
      header: 'Usuario no encontrado',
      icon: 'pi pi-user-plus',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'p-button-sucess p-button-text',
      rejectButtonStyleClass: 'p-button-danger p-button-text',
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      defaultFocus: 'none',
      accept: () => {
        this.registerUserAndLogin(email);
      },
    });
  }

  private registerUserAndLogin(email: string): void {
    this.loading = true;

    this.userService.create({ email }).subscribe({
      next: () => {
        this.attemptLogin({ email });
      },
      error: () => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo registrar el usuario.',
        });
      },
    });
  }

  private storeTokenAndNavigate(token: string, payload: LoginRequest): void {
    this.sessionService.setToken(token);
    this.sessionService.setEmail(payload.email);
    this.router.navigate(['/tasks']);
    this.loading = false;
  }
}
