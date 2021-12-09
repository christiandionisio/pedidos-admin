import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUser } from 'src/app/interfaces/authUser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public isSubmited: boolean = false;

  public registerForm = this.fb.group({
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    dni: ['', [Validators.required, Validators.minLength(8)]],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    terminos: [true],
  });

  public errorMessages = {
    nombres: '',
    apellidos: '',
    dni: '',
    correo: '',
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
    const token = response.token;
    localStorage.setItem('token', token);

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

    

    if (this.registerForm.invalid) {
      console.log('INVALID');
      this.setErrorMessage();
      this.isSubmited = true;

    } else {

      // this.login(this.loginForm.controls['username'].value, 
      //   this.loginForm.controls['password'].value, 
      //   this.loginForm.controls['remember'].value);

    }
  }

  setErrorMessage() {

    if (this.registerForm.controls['nombres'].errors != null) {
      const typeValidation: any = this.registerForm.controls['nombres'].errors;
      
      if (Object.keys(typeValidation)[0] === 'required') {
        this.errorMessages.nombres = 'El nombre es obligatorio';
      }
      
    }

    if (this.registerForm.controls['apellidos'].errors != null) {
      const typeValidation: any = this.registerForm.controls['apellidos'].errors;
      
      if (Object.keys(typeValidation)[0] === 'required') {
        this.errorMessages.apellidos = 'El apellido es obligatorio';
      }
      
    }

    if (this.registerForm.controls['dni'].errors != null) {
      const typeValidation: any = this.registerForm.controls['dni'].errors;
      console.log(typeValidation);
      
      if (Object.keys(typeValidation)[0] === 'required') {
        this.errorMessages.dni = 'El dni es obligatorio';
      }

      if (Object.keys(typeValidation)[0] === 'minlength') {
        this.errorMessages.dni = 'El dni debe tener 8 caracteres';
      }
      
    }

    if (this.registerForm.controls['correo'].errors != null) {
      const typeValidation: any = this.registerForm.controls['correo'].errors;
      
      if (Object.keys(typeValidation)[0] === 'required') {
        this.errorMessages.correo = 'El correo es obligatorio';
      }

      if (Object.keys(typeValidation)[0] === 'email') {
        this.errorMessages.correo = 'El formato del email es incorrecto';
      }
      
    }

    if (this.registerForm.controls['password'].errors != null) {
      const typeValidation: any = this.registerForm.controls['password'].errors;
      
      if (Object.keys(typeValidation)[0] === 'required') {
        this.errorMessages.password = 'Password es obligatorio';
      }
      
    }

    
  }

  cleanErrorMessages() {
    this.errorMessages = {
      nombres: '',
      apellidos: '',
      dni: '',
      correo: '',
      password: '',
      backendResponseMessage: '',
    };
  }

  cleanFormValues() {
    // this.loginForm.controls['username'].setValue('');
    // this.loginForm.controls['password'].setValue('');
    // this.loginForm.controls['remember'].setValue(false);
  }

  onlyNumber(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}
