import { Component } from '@angular/core';
import { LoginForm } from '../../models/login-form.interface';
import { AuthService } from '../../auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginDto: LoginForm;
  loginForm: FormGroup;
  isLoading: boolean = false;
  missingFields: boolean = false;
  wrongCredentials: boolean = false;
  authError: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginDto = {
      email: '',
      password: '',
    };
    this.loginForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  onSubmit(): void {
    if (this.isLoading) return;
    this.isLoading = true;

    this.missingFields = false;
    this.wrongCredentials = false;
    this.authError = false;

    this.loginDto = this.loginForm.value;

    this.authService.login(this.loginDto).subscribe({
      next: (res) => {
        if (!res.token) return;
        this.authService.saveToken(res.token);
        this.authService.saveUserId(res.loggedUser._id);
        this.router.navigate(['/']).then(() => window.location.reload());
      },
      error: (err) => {
        switch (err.error.message) {
          case '⚠ Missing fields!':
            this.missingFields = true;
            this.isLoading = false;
            break;
          case '⚠ Wrong credentials!':
            this.wrongCredentials = true;
            this.isLoading = false;
            break;
          default:
            this.authError = true;
            this.isLoading = false;
        }
        console.log(`${err.statusText}: ${err.error.message}`);
      },
    });
  }
}
