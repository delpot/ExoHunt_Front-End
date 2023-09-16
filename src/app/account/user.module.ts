import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { AccountComponent } from './account.component';

@NgModule({
  declarations: [AccountComponent],
  providers: [UserService],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class UserModule {}
