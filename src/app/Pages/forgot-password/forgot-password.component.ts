import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { StorageService } from "src/app/Services/storage.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  loggedInUser: string;
  loading: boolean = false;
  error: string = "";
  valid: boolean = false;

  recoverPasswordForm: FormGroup;

  constructor(
    private storageService: StorageService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.recoverPasswordForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
    });
    this.storageService.loggedUser.subscribe(user => {
      this.loggedInUser = user;
    });
  }

  getEmail() {
    return this.recoverPasswordForm.get("email");
  }

  onForgotPasswordSubmit() {
    const form = this.recoverPasswordForm.value;
    this.loading = true;

    if (form.email === this.loggedInUser) {
      alert("Email sent");
      setTimeout(() => {
        localStorage.removeItem(this.loggedInUser);
        localStorage.removeItem("auth-token");
        localStorage.removeItem("loggedInUser");
        this.loading = false;
        this.router.navigate(["/register"]);
      }, 5000);
    } else {
      this.error = "You cannot recover password for other users";
      setTimeout(() => {
        this.error = "";
        this.loading = false;
      }, 3000);
    }
  }
}
