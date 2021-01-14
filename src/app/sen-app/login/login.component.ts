import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@core/services/authentication/authentication.service';
// import { AccountService } from '../../login.account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });
  username: any;
  password: any;
  usertype: any;
  userstypes = ['Customer', 'Transporter', 'PLL'];

  validateMsg: any = '';
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  get uForm(): any {
    return this.loginForm.controls;
  }

  login(): void {
    const formData = new FormData();
    formData.append('uname', this.loginForm.get('username').value);
    formData.append('pw', this.loginForm.get('password').value);

    this.loginService.login(formData).subscribe(data => {
      console.log(data);
      // this.accountService.setToken(response);
      // if (response.usertype === 'customer') {
      //   this.router.navigate(['./index/customer-dashboard']);
      // } else if (response.usertype == 'pll') {
      //   this.router.navigate(['./index/pll-dashboard']);
      // } else {
      //   this.router.navigate(['./index/transporter-dashboard']);
      // }
    });
  }
}
