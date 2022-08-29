import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/Services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  loggedInUser: string;
  isUserAdmin: boolean = false;

  constructor(
    private storage: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.storage.loggedUser.subscribe(user => this.loggedInUser = user);
    this.storage.loggedUserIsAdmin.subscribe(value => this.isUserAdmin = value);


    if (!this.loggedInUser) {
      this.loggedInUser = localStorage.getItem('loggedInUser') || '';
    }

    this.isUserAdmin = JSON.parse(localStorage.getItem('userIsAdmin') || 'false');

  }

  ngOnChanges(): void {
    this.storage.loggedUser.subscribe(user => this.loggedInUser = user);
    this.storage.loggedUserIsAdmin.subscribe(value => this.isUserAdmin = value);
  };

  public logout(): void {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('userIsAdmin');
    this.isUserAdmin = false;
    localStorage.removeItem('auth-token');
    this.router.navigate(['/login']);
    this.storage.setLoggedInUser('');
  }

}
