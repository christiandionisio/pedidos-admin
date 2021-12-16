import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Producto } from 'src/app/interfaces/productos';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.component.html',
  styleUrls: ['./modal-producto.component.css']
})
export class ModalProductoComponent implements OnInit {

  public isSubmited: boolean = false;

  public registerForm = this.fb.group({
    nombre: ['', [Validators.required]],
    descripcion: ['', Validators.required],
    tipo: ['', Validators.required],
    precio: ['', Validators.required],
    stock: ['', Validators.required],
  });

  public errorMessages = {
    nombre : '',
    descripcion : '',
    tipo : '',
    precio : '',
    stock : '',
    backendResponseMessage: ''
  };

  constructor(private fb: FormBuilder,
              private productosService: ProductosService) { }

  ngOnInit(): void {
  }

  registarProducto(producto: Producto) {
    this.productosService.registrarProducto(producto).subscribe({
      next: this.handleLoginResponse.bind(this),
      error: this.handleLoginError.bind(this)
   });
   
  }

  handleLoginResponse(response: any) {
    this.isSubmited =false;
    this.cleanErrorMessages();
    this.cleanFormValues();

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

      this.setErrorMessage();
      this.isSubmited = true;

    } else {

      // this.registerForm(this.loginForm.controls['username'].value, 
      //   this.loginForm.controls['password'].value, 
      //   this.loginForm.controls['remember'].value);

    }
  }

  setErrorMessage() {

    if (this.registerForm.controls['nombre'].errors != null) {
      const nombreValidation: any = this.registerForm.controls['nombre'].errors;
      
      if (Object.keys(nombreValidation)[0] === 'required') {
        this.errorMessages.nombre = 'El nombre es obligatorio';
      }
      
    }

    if (this.registerForm.controls['descripcion'].errors != null) {
      const descripcionValidation: any = this.registerForm.controls['descripcion'].errors;
      
      if (Object.keys(descripcionValidation)[0] === 'required') {
        this.errorMessages.descripcion = 'La descripción es obligatorio';
      }
      
    }

    if (this.registerForm.controls['tipo'].errors != null) {
      const tipoValidation: any = this.registerForm.controls['tipo'].errors;
      
      if (Object.keys(tipoValidation)[0] === 'required') {
        this.errorMessages.tipo = 'El tipo es obligatorio';
      }
      
    }

    if (this.registerForm.controls['precio'].errors != null) {
      const precioValidation: any = this.registerForm.controls['precio'].errors;
      
      if (Object.keys(precioValidation)[0] === 'required') {
        this.errorMessages.precio = 'El precio es obligatorio';
      }
      
    }

    if (this.registerForm.controls['stock'].errors != null) {
      const stockValidation: any = this.registerForm.controls['stock'].errors;
      
      if (Object.keys(stockValidation)[0] === 'required') {
        this.errorMessages.stock = 'El stock es obligatorio';
      }
      
    }
    
  }

  cleanErrorMessages() {
    this.errorMessages = {
      nombre : '',
      descripcion : '',
      tipo : '',
      precio : '',
      stock : '',
      backendResponseMessage: ''
    };
  }

  cleanFormValues() {
    this.registerForm.controls['nombre'].setValue('');
    this.registerForm.controls['descripcion'].setValue('');
    this.registerForm.controls['tipo'].setValue('');
    this.registerForm.controls['precio'].setValue('');
    this.registerForm.controls['stock'].setValue('');
  }

}
