import { Component, OnInit } from "@angular/core";
import { StorageService } from "src/app/Services/storage.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  selector: "app-add-shift",
  templateUrl: "./add-shift.component.html",
  styleUrls: ["./add-shift.component.scss"],
})
export class AddShiftComponent implements OnInit {
  userData: UserData;
  userShift: UserShift;
  shiftDb: any;
  loggedInUser: string;

  shiftForm: FormGroup;

  private getUserData(user: string) {
    this.userData = this.storageService.getLocalStorageUserData(user);
  }

  private getShiftData() {
    this.shiftDb = this.storageService.getLocalStorageUserShifts();
  }

  private setShiftData(data: UserShift) {
    this.storageService.setLocalStorageUserShifts(data);
  }

  constructor(
    private storageService: StorageService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.storageService.loggedUser.subscribe(
      (user) => (this.loggedInUser = user)
    );
    if (!this.loggedInUser) {
      this.loggedInUser = localStorage.getItem("loggedInUser") || "";
    }

    this.getUserData(this.loggedInUser);
    this.getShiftData();

    this.shiftForm = this.fb.group({
      user: [this.loggedInUser],
      shiftSlug: ["", [Validators.required, Validators.minLength(3)]],
      shiftStartTime: ["", [Validators.required]],
      shiftEndTime: ["", [Validators.required]],
      shiftDate: [new Date()],
      hourlyRate: ["", [Validators.required, Validators.min(0)]],
      workplace: ["", [Validators.required]],
      shiftDescription: ["", [Validators.required]],
    });
  }

  get shiftSlug() {
    return this.shiftForm.get("shiftSlug");
  }
  get shiftStartTime() {
    return this.shiftForm.get("shiftStartTime");
  }
  get shiftEndTime() {
    return this.shiftForm.get("shiftEndTime");
  }
  get shiftDate() {
    return this.shiftForm.get("shiftDate");
  }
  get hourlyRate() {
    return this.shiftForm.get("hourlyRate");
  }
  get workplace() {
    return this.shiftForm.get("workplace");
  }
  get shiftDescription() {
    return this.shiftForm.get("shiftDescription");
  }

  submitHandler() {
    const form = this.shiftForm.value;

    if ( !this.shiftDb ) {
      this.shiftDb = JSON.parse(localStorage.getItem("shifts") || "");
    }

    this.shiftDb.push(form);
    this.setShiftData(this.shiftDb);


    alert("Shift Added Successfully");
    this.router.navigate(["/"]);
  }
}
