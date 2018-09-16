import { Component, OnInit }        from '@angular/core';
import { AuthService }      from '../service/auth.service';
import { Location } from '@angular/common';
import {Router} from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    profile: object;
    isLogged: boolean = false;

    constructor(public authService: AuthService, public router: Router, private location: Location) { }

    ngOnInit() {
      this.authService.profile.subscribe(account => {
        this.profile = account;
        this.isLogged = this.authService.isLoggedIn;
      });
    }

    logout() {
      this.authService.logout();
      this.isLogged = false;
      this.router.navigate(['/login']);
    }

    back() {
      this.location.back();
    }
}
