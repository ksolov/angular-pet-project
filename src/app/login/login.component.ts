import { Component }        from '@angular/core';
import { Router } from '@angular/router';
import { AuthService }      from '../service/auth.service';
import { Validate } from '../helpers/validate';
import * as routes  from './../constants/routing';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    message: string;
    isLogged: boolean = false;
    input: any;

    constructor(public authService: AuthService, public router: Router) {
      this.input = {
        "email": "",
        "password": ""
      };
    }

    login() {
      if (!Validate.isValidEmail(this.input.email)) {
        this.message = 'Error in email field';
        return;
      } else if (!Validate.isValidPassword(this.input.password)) {
        this.message = 'Error in password field';
        return;
      } else {
        this.message = 'Trying to log in ...';
        this.authService.login(this.input).subscribe((data) => {
          if (this.authService.isLoggedIn) {
            this.isLogged = true;
            let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : routes.search;
            this.router.navigate([redirect]);
          }
        });
      }
    }
}
