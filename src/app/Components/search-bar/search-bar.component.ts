import { Component, OnInit } from "@angular/core";
import { SearchFiltersService } from "src/app/Services/search-filters.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"],
})
export class SearchBarComponent implements OnInit {
  public searchTerm: string;
  public error: string = "";

  dateRangeForm: FormGroup;

  constructor(private search: SearchFiltersService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.dateRangeForm = this.fb.group({
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
    });
  }

  get startDate() {
    return this.dateRangeForm.get("startDate");
  }

  get endDate() {
    return this.dateRangeForm.get("endDate");
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.search.setWord(filterValue);
  }

  public submitHandler() {
    if (this.dateRangeForm.valid) {
      const rangeForm = this.dateRangeForm.value;

      const from = new Date(rangeForm.startDate);
      const to = new Date(rangeForm.endDate);

      const dateInterval = {
        from: from,
        to: to,
      };
      this.search.setDateInterval(dateInterval);
    }
  }

  public clearFilter() {
    this.dateRangeForm.reset();
    this.search.setWord("");
    this.search.setDateInterval({
      from: null,
      to: null,
    });
  }
}
