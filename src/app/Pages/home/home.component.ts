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
  private loggedInUser: string;
  private localStorageShifts: any;
  private isUserAdmin: boolean = false;

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

    this.search.searchWordChange.subscribe((searchWord: string) => {
      if (this.searchWord != searchWord) {
        this.applyFilter(searchWord);
      }
      this.searchWord = searchWord;
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
  public applyFilter(filter: string) {
    this.shiftDb = this.localStorageShifts.filter((shift: UserShift) =>
      shift.shiftSlug.includes(filter)
    );
  }
}
