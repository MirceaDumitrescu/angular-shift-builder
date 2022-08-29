import { Component, OnInit } from "@angular/core";
import { StorageService } from "src/app/Services/storage.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  public loggedInUser: string;
  public isAdmin: boolean = false;
  private userData: UserData;
  public data: any;

  profileForm: FormGroup;

  private getUserData(user: string) {
    this.userData = this.storage.getLocalStorageUserData(user);
  }

  private setUserData(user: string, data: any) {
    this.storage.setLocalStorageUserData(user, data);
  }

  constructor(private storage: StorageService, private fb: FormBuilder) {}


  ngOnInit(): void {
    this.storage.loggedUser.subscribe((user) => (this.loggedInUser = user));
    this.storage.loggedUserIsAdmin.subscribe((value) => (this.isAdmin = value));

    if (!this.loggedInUser) {
      this.loggedInUser = localStorage.getItem("loggedInUser") || "";
    }

    this.isAdmin = JSON.parse(localStorage.getItem("userIsAdmin") || "false");

    this.getUserData(this.loggedInUser);
    this.data = Object.entries(this.userData).map((e) =>
      Object.assign({}, { [e[0]]: e[1] })
    );

    this.profileForm = this.fb.group({
      username: [this.userData.username, [Validators.minLength(3)]],
      email: [this.userData.email, [Validators.email]],
      firstName: [this.userData.firstName, [Validators.minLength(3)]],
      lastName: [this.userData.lastName, [Validators.minLength(3)]],
      phone: [this.userData.phone, [Validators.pattern("^[0-9]*$"), Validators.minLength(10)]],
      age: [this.userData.age, [Validators.pattern("^[0-9]*$"), Validators.min(16), Validators.max(100)]]
    });
  }

  get username() {
    return this.profileForm.get("username");
  }
  get email() {
    return this.profileForm.get("email");
  }
  get password() {
    return this.profileForm.get("password");
  }
  get firstName() {
    return this.profileForm.get("firstName");
  }
  get lastName() {
    return this.profileForm.get("lastName");
  }
  get phone() {
    return this.profileForm.get("phone");
  }
  get age() {
    return this.profileForm.get("age");
  }


  public updateProfile(): void {

    const form = this.profileForm.value;

    this.setUserData(this.loggedInUser, form);
    alert("Profile updated successfully");

  }



}
