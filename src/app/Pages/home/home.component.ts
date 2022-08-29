import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/Services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  localStorageShifts: any;
  shiftDb: any;
  loggedInUser: string;
  isUserAdmin: boolean = false;

  private getLocalShiftStorage():void {
    this.localStorageShifts = this.storage.getLocalStorageUserShifts();
  }

  private filterByLoggedInUser(data: any):void{
    this.shiftDb = data.filter((shift: UserShift) => shift.user === this.loggedInUser);
  }

  constructor( private storage: StorageService ) { }

  ngOnInit(): void {
    this.storage.loggedUser.subscribe(user => this.loggedInUser = user);
    this.storage.loggedUserIsAdmin.subscribe(value => this.isUserAdmin = value);
    this.getLocalShiftStorage();

    if (!this.loggedInUser) {
      this.loggedInUser = localStorage.getItem('loggedInUser') || '';
    }

    if (!this.isUserAdmin) {
      this.isUserAdmin = JSON.parse(localStorage.getItem('userIsAdmin') || 'false');
    }

    if(!this.localStorageShifts) {
      this.localStorageShifts = JSON.parse(localStorage.getItem('shifts') || '');
    }


    if ( !this.isUserAdmin ) {
    this.filterByLoggedInUser(this.localStorageShifts);
    } else {
      this.shiftDb = this.localStorageShifts;
    }
  }

  ngOnChanges(): void {
    this.storage.loggedUser.subscribe(user => this.loggedInUser = user);
  }

}
