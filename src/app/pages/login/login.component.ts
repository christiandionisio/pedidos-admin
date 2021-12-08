import { Component, OnInit } from '@angular/core';
import { AuthUser } from 'src/app/interfaces/authUser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.login();
  }

  login() {
    const authUserData: AuthUser = {
      "username": "christiandionisio@gmail.com",
      "password": "123456",
      "remember": false
    };

    this.authService.login(authUserData).subscribe( response => {
      console.log(response);
    });
  }

}
