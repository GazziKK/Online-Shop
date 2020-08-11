import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/service/auth.service';
import {User} from '../shared/interfaces/user.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitet = false;
  form: FormGroup;
  constructor(
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9_]+@[a-z]{2,6}.[a-z]{2,4}')]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  if (this.auth.isLogin() === true){
    this.router.navigate(['admin']);
  }
  }
  submit() {
    if (this.form.invalid){
      return;
    }
    this.submitet = true;
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };
    this.auth.login(user).subscribe((response) => {
      this.form.reset();
      this.router.navigate(['admin']);
      this.submitet = false;
    }, () => {
      this.submitet = false;
    });
  }
}
