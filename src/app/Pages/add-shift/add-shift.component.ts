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
  public userData: UserData;
  public userShift: UserShift;
  private shiftDb: any;
  private loggedInUser: string;
  public error: string = "";

  public shiftForm: FormGroup;

  private today: Date = new Date();

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
      shiftDate: [this.today],
      hourlyRate: ["", [Validators.required, Validators.min(0), Validators.pattern("^[0-9]*$")]],
      workplace: ["", [Validators.required, Validators.minLength(3)]],
      shiftDescription: ["", [Validators.required, Validators.minLength(10)]],
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

    if (!this.shiftDb) {
      this.shiftDb = JSON.parse(localStorage.getItem("shifts") || "");
    }

    //check if the shift interval overlaps an existing shift
    const startingDate = new Date(form.shiftStartTime);
    const endingDate = new Date(form.shiftEndTime);

    const overlappingShift = this.shiftDb.find((shift: UserShift) => {
      const shiftInterval = {
        startingDate: new Date(shift.shiftStartTime),
        endingDate: new Date(shift.shiftEndTime),
      };

      if (
        (shiftInterval.startingDate >= startingDate &&
          shiftInterval.startingDate <= endingDate) ||
        (shiftInterval.endingDate >= startingDate &&
          shiftInterval.endingDate <= endingDate)
      ) {
        return true;
      }
      return false;
    });

    if (overlappingShift) {
      this.error = `Shift interval overlaps with ${
        overlappingShift.shiftSlug
      } from ${new Date(overlappingShift.shiftStartTime).toLocaleDateString(
        "en-US"
      )} to ${new Date(overlappingShift.shiftEndTime).toLocaleDateString(
        "en-US"
      )}`;
      return;
    }

    this.shiftDb.push(form);
    this.setShiftData(this.shiftDb);
    this.error = "";
    alert("Shift Added Successfully");
    this.router.navigate(["/"]);
  }
}
