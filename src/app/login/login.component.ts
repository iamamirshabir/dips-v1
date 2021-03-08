import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {


  email = new FormControl('', [Validators.required, Validators.email]);

  credentials = {username: '', password: ''};

  hide = true;

  loginerror; redirected=false;

  constructor(private app: AppService, private router: Router) { }

  login() {
    this.app.authenticate(this.credentials, () => {
        this.router.navigateByUrl('/dashboard');
    });
    this.loginerror=true;
    return false;
    }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  ngOnInit(): void {
  }



}
