import { Component, OnInit } from '@angular/core';
import { SearchFiltersService } from 'src/app/Services/search-filters.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  public searchTerm: string;

  constructor(
    private search: SearchFiltersService
  ) { }

  ngOnInit(): void {
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.search.setWord(filterValue);
  }
}
