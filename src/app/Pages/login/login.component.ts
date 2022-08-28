import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/Services/storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userData: any = {};
  loginForm: FormGroup;
  error: string = '';

  private getUserData(user: string):void {
    this.userData = this.storageService.getLocalStorageUserData(user);
  }

  constructor(
    private storageService: StorageService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async submit():Promise<void> {
    const loginForm = this.loginForm.value;
    this.getUserData(loginForm.email);

    if ( this.userData?.password === loginForm.password ) {
      this.error = '';
      this.createToken();
      this.router.navigate(['/']);
    } else {
      this.error = 'Invalid credentials';
    }

  }

  private createToken():void {
    const token = 'auth-token';
    this.storageService.setLocalStorageUserData(token, this.userData);
  }

}
