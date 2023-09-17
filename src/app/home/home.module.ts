import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [HomeComponent],
  providers: [],
  imports: [CommonModule, AuthModule],
  exports: [],
})
export class HomeModule {}
