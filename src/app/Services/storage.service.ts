import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  localStorageUserData: any;
  localStorageShiftData: UserShift = JSON.parse(localStorage.getItem('shiftData') || '{}');

  getLocalStorageUserData(user: UserEmail) {
    console.log(user.email);
    this.localStorageShiftData = JSON.parse(localStorage.getItem(user.email) || '{}');
    return this.localStorageUserData;
  }

  setLocalStorageUserData(user: UserEmail, data: UserData) {
    this.localStorageUserData = data;
    localStorage.setItem(user.email, JSON.stringify(data));
  }

  getLocalStorageUserShifts() {
    return this.localStorageUserData.shifts;
  }

  setLocalStorageUserShifts(data: UserShift) {
    this.localStorageUserData.shifts.push(data);
    localStorage.setItem('userData', JSON.stringify(this.localStorageUserData));
  }


  constructor() { }
}
