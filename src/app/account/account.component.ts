import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  UpdateAccountForm,
  UpdatePasswordForm,
} from './update-account-form.interface';
import { UserService } from './user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  updateAccountDto: UpdateAccountForm;
  updateInformationForm: FormGroup;
  updatePasswordDto: UpdatePasswordForm;
  updatePasswordForm: FormGroup;
  countries: string[] = ['France', 'Monaco', 'Italie'];
  invalidEmail = false;
  missingFields = false;
  wrongPassword = false;
  userNotFound = false;
  updatePasswordError = false;
  invalidPassword = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.updateAccountDto = {
      userId: '',
      firstname: '',
      lastname: '',
      email: '',
      addressLine1: '',
      city: '',
      postalCode: 0,
      country: '',
      addressLine2: '',
      dateOfBirth: new Date(),
    };
    this.updatePasswordDto = {
      oldPassword: '',
      newPassword: '',
    };
    this.updateInformationForm = this.formBuilder.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [
        null,
        [Validators.required, Validators.email, Validators.minLength(6)],
      ],
      dateOfBirth: [null, Validators.required],
      addressLine1: [null, Validators.required],
      city: [null, Validators.required],
      postalCode: [null, Validators.required],
      country: [null, Validators.required],
      addressLine2: [null],
    });
    this.updatePasswordForm = this.formBuilder.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
          ),
        ],
      ],
    });
  }

  ngOnInit(): void {
    const localUserId = localStorage.getItem('userId');
    if (!localUserId) return;
    this.updateAccountDto.userId = localUserId;
    this.userService.getUserAccount(this.updateAccountDto.userId).subscribe({
      next: (res) => {
        this.updateAccountDto.firstname = res.firstname;
        this.updateAccountDto.lastname = res.lastname;
        this.updateAccountDto.email = res.email;
        this.updateAccountDto.addressLine1 = res.address.addressLine1;
        this.updateAccountDto.city = res.address.city;
        this.updateAccountDto.postalCode = res.address.postalCode;
        this.updateAccountDto.country = res.address.country;
        if (res.address.addressLine2) {
          this.updateAccountDto.addressLine2 = res.address.addressLine2;
        } else {
          this.updateAccountDto.addressLine2 = '';
        }
        this.updateAccountDto.dateOfBirth = res.dateOfBirth.slice(0, 10);
      },
      error: (err) => {
        console.log(`${err.statusText}: ${err.error.message}`);
      },
    });
  }

  onSubmitInformation(): void {
    if (this.updateInformationForm.controls['firstname'].value) {
      this.updateAccountDto.firstname =
        this.updateInformationForm.controls['firstname'].value;
    }
    if (this.updateInformationForm.controls['lastname'].value) {
      this.updateAccountDto.lastname =
        this.updateInformationForm.controls['lastname'].value;
    }
    if (this.updateInformationForm.controls['email'].value) {
      this.updateAccountDto.email =
        this.updateInformationForm.controls['email'].value;
    }
    if (this.updateInformationForm.controls['dateOfBirth'].value) {
      this.updateAccountDto.dateOfBirth =
        this.updateInformationForm.controls['dateOfBirth'].value;
    }
    if (this.updateInformationForm.controls['addressLine1'].value) {
      this.updateAccountDto.addressLine1 =
        this.updateInformationForm.controls['addressLine1'].value;
    }
    if (this.updateInformationForm.controls['addressLine2'].value) {
      this.updateAccountDto.addressLine2 =
        this.updateInformationForm.controls['addressLine2'].value;
    }
    if (this.updateInformationForm.controls['city'].value) {
      this.updateAccountDto.city =
        this.updateInformationForm.controls['city'].value;
    }
    if (this.updateInformationForm.controls['postalCode'].value) {
      this.updateAccountDto.postalCode =
        this.updateInformationForm.controls['postalCode'].value;
    }
    if (this.updateInformationForm.controls['country'].value) {
      this.updateAccountDto.country =
        this.updateInformationForm.controls['country'].value;
    }

    this.invalidEmail = false;

    this.userService
      .updateUserAccount(this.updateAccountDto.userId, this.updateAccountDto)
      .subscribe({
        next: (res) => {
          this.router
            .navigate(['/account'])
            .then(() => window.location.reload());
        },
        error: (err) => {
          if (err.error.message === '⚠ Invalid email!') {
            this.invalidEmail = true;
          }
          console.log(`${err.statusText}: ${err.error.message}`);
        },
      });
  }

  onSubmitPassword(control: AbstractControl | null): void {
    if (this.updatePasswordForm.controls['oldPassword'].value) {
      this.updatePasswordDto.oldPassword =
        this.updatePasswordForm.controls['oldPassword'].value;
    }
    if (this.updatePasswordForm.controls['newPassword'].value) {
      this.updatePasswordDto.newPassword =
        this.updatePasswordForm.controls['newPassword'].value;
    }

    this.missingFields = false;
    this.wrongPassword = false;
    this.userNotFound = false;
    this.updatePasswordError = false;
    this.invalidPassword = false;

    this.userService
      .updateUserPassword(this.updateAccountDto.userId, this.updatePasswordDto)
      .subscribe({
        next: (res) => {
          this.router
            .navigate(['/account'])
            .then(() => window.location.reload());
        },
        error: (err) => {
          switch (err.error.message) {
            case '⚠ Missing fields!':
              this.missingFields = true;
              break;
            case '⚠ Wrong password!':
              this.wrongPassword = true;
              break;
            case '⚠ Invalid password!':
              this.invalidPassword = true;
              break;
            case '⚠ User not found!':
              this.userNotFound = true;
              break;
            default:
              this.updatePasswordError = true;
          }
          console.log(`${err.statusText}: ${err.error.message}`);
        },
      });
  }
}
