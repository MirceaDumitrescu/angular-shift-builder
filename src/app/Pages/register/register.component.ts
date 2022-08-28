import { EncrDecrService } from './../../Services/encr-decr.service';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/Services/storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userData: any = {};

  loading: boolean = false;
  success: boolean = false;

  registerForm: FormGroup;

  getUserData(user: string) {
    this.userData = this.storageService.getLocalStorageUserData(user);
  }

  setUserData(user: string, data: UserData) {
    this.storageService.setLocalStorageUserData(user, data);
  }

  encryptPassword(password: string) {
    return this.encrypt.encrypt('123456$#@$^@1ERF', password);
  }

  constructor(
    private storageService: StorageService,
    private encrypt: EncrDecrService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(3)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
      phone: '',
      role: '',
      firstName: '',
      lastName: '',
    });
  }

  get username() {
    return this.registerForm.get('username');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
  get phone() {
    return this.registerForm.get('phone');
  }
  get role() {
    return this.registerForm.get('role');
  }
  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }

  async submitHandler() {
    this.loading = true;

    const myForm = this.registerForm.value;

    this.getUserData(myForm.email);

    if (this.userData?.username) {
      this.loading = false;
      alert('Username or Email already exists');
      return;
    }

    if (myForm.password !== myForm.confirmPassword) {
      this.loading = false;
      return alert('Passwords do not match');
    }

    this.setUserData(
      myForm.email,
      {
        username: myForm.username,
        email: myForm.email,
        password: this.encryptPassword(myForm.password),
        phone: myForm.phone,
        role: myForm.role,
        firstName: myForm.firstName,
        lastName: myForm.lastName,
        shifts: [],
      }
    );
    this.success = true;
    alert('Registration successful');
    console.log('success', this.userData);
    this.router.navigate(['/login']);
  }
}
