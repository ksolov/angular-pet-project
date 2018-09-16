import { Component }        from '@angular/core';
import { Router } from '@angular/router';
import { AuthService }      from '../service/auth.service';
import { Validate } from '../helpers/validate';
import * as routes  from './../constants/routing';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent {
  message: string;
  input: any;

  constructor(public authService: AuthService, public router: Router) {
    this.input = {
      "email": "",
      "name": "",
      "password": "",
      "passwordConfirm": ""
    };
  }

  validateForm() {
    let msg = '';
    if (!Validate.isValidEmail(this.input.email)) {
      msg = 'Error in email field';
    } else if (!Validate.isValidPassword(this.input.password)) {
      msg = 'Error in password field';
    } else if (!Validate.isValidPassword(this.input.passwordConfirm)) {
      msg = 'Error in confirm password field';
    } else if (this.input.passwordConfirm !==  this.input.password) {
      msg = 'Password and confirm password is not equal';
    } else if (this.input.name === '') {
      msg = 'Please, enter your name';
    }
    return msg;
  }

  registration() {
    const msg = this.validateForm();
    if (msg !== '') {
      this.message = msg;
      return;
    } else {
      this.message = 'Trying to registration ...';
      this.authService.registration(this.input).subscribe(() => {
        this.router.navigate([routes.search   ]);
      });
    }
  }
}
