export interface RegisterForm {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: Date;
  addressLine1: string;
  city: string;
  postalCode: string;
  country: string;
  addressLine2?: string;
}
