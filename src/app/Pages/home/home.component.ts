import { SearchFiltersService } from "./../../Services/search-filters.service";
import { Component, OnInit } from "@angular/core";
import { StorageService } from "src/app/Services/storage.service";
import Debounce from "debounce-decorator";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public searchWord: string;
  public shiftDb: any;
  public bestMonth: number = 0;
  public bestMonthName: string = "";
  private loggedInUser: string;
  private localStorageShifts: any;
  private isUserAdmin: boolean = false;
  private dateRange: any;

  private getLocalShiftStorage(): void {
    this.localStorageShifts = this.storage.getLocalStorageUserShifts();
  }

  private filterByLoggedInUser(data: any): void {
    this.shiftDb = data.filter(
      (shift: UserShift) => shift.user === this.loggedInUser
    );
  }

  constructor(
    private storage: StorageService,
    private search: SearchFiltersService
  ) {}

  ngOnInit(): void {
    this.getLocalShiftStorage();

    this.applyFilter(this.searchWord);

    this.search.searchWordChange.subscribe((searchWord: string): void => {
      if (this.searchWord != searchWord) {
        this.applyFilter(searchWord);
      }
      this.searchWord = searchWord;
    });

    this.search.searchDateInterval.subscribe((dateRange: any): void => {
      if (this.dateRange != dateRange) {
        this.applyFilter(this.searchWord, dateRange);
      }

      this.dateRange = dateRange;
    });

    if (!this.loggedInUser) {
      this.loggedInUser = localStorage.getItem("loggedInUser") || "";
    }

    if (!this.isUserAdmin) {
      this.isUserAdmin = JSON.parse(
        localStorage.getItem("userIsAdmin") || "false"
      );
    }

    if (!this.localStorageShifts) {
      this.localStorageShifts = JSON.parse(
        localStorage.getItem("shifts") || ""
      );
    }

    if (!this.isUserAdmin) {
      this.filterByLoggedInUser(this.localStorageShifts);
    } else {
      this.shiftDb = this.localStorageShifts;
    }
  }
  @Debounce(500)
  public applyFilter(filter: string, dateRange: any = null) {
    let data = this.localStorageShifts.filter((shift: UserShift) =>
      shift.shiftSlug.includes(filter)
    );

    // create the total earnings for each shift
    data.forEach((shift: UserShift) => {
      let startDate = new Date(shift.shiftStartTime);
      let endDate = new Date(shift.shiftEndTime);

      let totalDays = Math.round(
        Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
      );
      let totalEarnings = totalDays * 8 * shift.hourlyRate;
      shift.totalEarnings = totalEarnings;
    });

    // calculate and check which is the best earning month for the user
    const monthCalculations: any = {};
    data.forEach((shift: UserShift) => {
      let shiftDate = new Date(shift.shiftDate);
      let monthName = shiftDate.toLocaleString("default", { month: "long" });
      let monthEarnings: number = shift.totalEarnings;

      if (!monthCalculations[monthName]) {
        monthCalculations[monthName] = 0;
      }

      monthCalculations[monthName] += monthEarnings;

      if (monthCalculations[monthName] > this.bestMonth) {
        this.bestMonthName = monthName;
        this.bestMonth = monthCalculations[monthName];
      }
    });

    if (dateRange && dateRange.from && dateRange.to) {
      this.shiftDb = data.filter((shift: UserShift) => {
        const interval = {
          from: new Date(shift.shiftStartTime),
          to: new Date(shift.shiftEndTime),
        };

        if (interval.from >= dateRange.from && interval.to <= dateRange.to) {
          return true;
        }
        return false;
      });
    } else {
      this.shiftDb = data;
    }
  }
}
