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

  constructor(
    private storage: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.storage.loggedUser.subscribe(user => this.loggedInUser = user);

    if (!this.loggedInUser) {
      this.loggedInUser = localStorage.getItem('loggedInUser') || '';
    }
  }

  ngOnChanges(): void {
    this.storage.loggedUser.subscribe(user => this.loggedInUser = user);
  };

  public logout(): void {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.storage.setLoggedInUser('');
  }

}
