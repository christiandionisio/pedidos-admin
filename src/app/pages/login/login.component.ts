import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    password: '',
    backendResponseMessage: '',
  };

  constructor(private authService: AuthService, 
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
  }

  login(username: String, password: String, remember: boolean) {
    const authUserData: AuthUser = {
      username,
      password,
      remember
    };

    this.authService.login(authUserData).subscribe({
      next: this.handleLoginResponse.bind(this),
      error: this.handleLoginError.bind(this)
   });
   
  }

  handleLoginResponse(response: any) {
    this.isSubmited =false;
    this.cleanErrorMessages();
    this.cleanFormValues();

    this.router.navigateByUrl('/dashboard');

  }

  handleLoginError(response: any) {

    if (response.status === 401) {
      this.errorMessages.backendResponseMessage = 'Credenciales incorrectas';
    } else {
      this.errorMessages.backendResponseMessage = 'Error técnico, debe contactarse con el administrador'
    }
    
  }

  onSubmit() {
    console.log("Submit");

    if (this.loginForm.invalid) {

      this.setErrorMessage();
      this.isSubmited = true;

    } else {

      this.login(this.loginForm.controls['username'].value, 
        this.loginForm.controls['password'].value, 
        this.loginForm.controls['remember'].value);

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
      password: '',
      backendResponseMessage: ''
    };
  }

  cleanFormValues() {
    this.loginForm.controls['username'].setValue('');
    this.loginForm.controls['password'].setValue('');
    this.loginForm.controls['remember'].setValue(false);
  }

}
