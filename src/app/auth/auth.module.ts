import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  providers: [AuthService],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [LoginComponent, RegisterComponent],
})
export class AuthModule {}
