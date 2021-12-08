import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthUser } from 'src/app/interfaces/authUser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public isSubmited: boolean = false;

  public loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false],
  });

  public errorMessages = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, 
    private fb: FormBuilder) { }

  ngOnInit(): void {
    // this.login();
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

  onSubmit() {
    console.log("Submit");

    if (this.loginForm.invalid) {

      this.setErrorMessage();
      this.isSubmited = true;

    } else {

      this.isSubmited =false;
      this.cleanErrorMessages();
      this.cleanFormValues();

    }
  }

  setErrorMessage() {

    if (this.loginForm.controls['username'].errors != null) {
      const usernameValidation: any = this.loginForm.controls['username'].errors;
      
      if (Object.keys(usernameValidation)[0] === 'required') {
        this.errorMessages.username = 'Email es obligatorio';
      }

      if (Object.keys(usernameValidation)[0] === 'email') {
        this.errorMessages.username = 'El formato del email es incorrecto';
      }
      
    }

    if (this.loginForm.controls['password'].errors != null) {
      const passwordValidation: any = this.loginForm.controls['password'].errors;
      
      if (Object.keys(passwordValidation)[0] === 'required') {
        this.errorMessages.password = 'Password es obligatorio';
      }
      
    }
  }

  cleanErrorMessages() {
    this.errorMessages = {
      username: '',
      password: ''
    };
  }

  cleanFormValues() {
    this.loginForm.controls['username'].setValue('');
    this.loginForm.controls['password'].setValue('');
    this.loginForm.controls['remember'].setValue(false);
  }

}
