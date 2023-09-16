export interface UpdateAccountForm {
  userId: string;
  firstname: string;
  lastname: string;
  email: string;
  addressLine1: string;
  city: string;
  postalCode: number;
  country: string;
  addressLine2?: string;
  dateOfBirth?: Date;
}

export interface UpdatePasswordForm {
  oldPassword: string;
  newPassword: string;
}
