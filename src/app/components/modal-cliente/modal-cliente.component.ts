import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/interfaces/clientes';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-modal-cliente',
  templateUrl: './modal-cliente.component.html',
  styleUrls: ['./modal-cliente.component.css']
})
export class ModalClienteComponent implements OnInit {

  @Input('verCliente') verCliente!: Cliente;
  @Input('editarCliente') editarCliente!: Cliente;
  @Output() isEditarOkResponse: EventEmitter<any> = new EventEmitter();

  @ViewChild('fileInput') fileInputHTML: any;
  public urlImage: any;
  public fileProductImage: any = null;

  public isSubmited: boolean = false;

  public registerForm = this.fb.group({
    nombres: ['', [Validators.required]],
    apellidos: ['', Validators.required],
    dni: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  public errorMessages = {
    nombres : '',
    apellidos : '',
    dni : '',
    correo : '',
    password: '',
    backendResponseMessage: ''
  };

  constructor(private fb: FormBuilder,
              private clientesService: ClientesService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    if (this.verCliente != undefined) {
      this.mostrarDatosCliente(this.verCliente);
      this.bloquearInputs();
    }

    if (this.editarCliente != undefined) {
      this.mostrarDatosCliente(this.editarCliente);
    }
  }

  mostrarDatosCliente(cliente: Cliente): void{
    this.registerForm.controls['nombres'].setValue(cliente.nombres);
    this.registerForm.controls['apellidos'].setValue(cliente.apellidos);
    this.registerForm.controls['dni'].setValue(cliente.dni);
    this.registerForm.controls['correo'].setValue(cliente.correo);
    
    this.registerForm.controls['password'].setValue('********');
    this.registerForm.controls['password'].disable(); 
  }

  bloquearInputs() {
    this.registerForm.controls['nombres'].disable();
    this.registerForm.controls['apellidos'].disable();
    this.registerForm.controls['dni'].disable();
    this.registerForm.controls['correo'].disable();
    this.registerForm.controls['password'].disable();
  }

  registarCliente(cliente: Cliente) {
    this.clientesService.registrarCliente(cliente).subscribe({
      next: this.handleRegisterResponse.bind(this),
      error: this.handleRegisterError.bind(this)
   });
   
  }

  handleRegisterResponse(response: any) {
    this.isSubmited =false;

    this.cleanErrorMessages();
      this.cleanFormValues();
      this.cerrarModal();
      this.toastr.success('Se registró el cliente satisfactoriamente', 'Registro Satisfactorio!');
  }

  handleRegisterError(response: any) {
    if (response.status === 401) {
      this.errorMessages.backendResponseMessage = 'Credenciales incorrectas';
    } else {
      this.errorMessages.backendResponseMessage = 'Error técnico, debe contactarse con el administrador'
    }
  }

  updateCliente(cliente: Cliente) {

    cliente.id = this.editarCliente.id;

    this.clientesService.updateCliente(cliente).subscribe({
      next: this.handleUpdateResponse.bind(this),
      error: this.handleUpdateError.bind(this)
   });
  }

  handleUpdateResponse(response: any) {
    this.isSubmited =false;

    this.cleanErrorMessages();
      this.cleanFormValues();
      this.cerrarModal();
      this.toastr.success('Se actualizó el cliente satisfactoriamente', 'Registro Satisfactorio!');
      this.isEditarOkResponse.emit(true);
  }

  handleUpdateError(response: any) {
    if (response.status === 401) {
      this.errorMessages.backendResponseMessage = 'Credenciales incorrectas';
    } else {
      this.errorMessages.backendResponseMessage = 'Error técnico, debe contactarse con el administrador'
    }
    this.isEditarOkResponse.emit(false);
  }

  onSubmit() {

    if (this.registerForm.invalid) {

      this.setErrorMessage();
      this.isSubmited = true;

    } else {

      if (this.editarCliente == undefined) {
        this.registarCliente(this.registerForm.value); 
      } else {
        this.updateCliente(this.registerForm.value);
      }

    }
  }

  setErrorMessage() {

    if (this.registerForm.controls['nombres'].errors != null) {
      const nombresValidation: any = this.registerForm.controls['nombres'].errors;
      
      if (Object.keys(nombresValidation)[0] === 'required') {
        this.errorMessages.nombres = 'Nombres es obligatorio';
      }
      
    }

    if (this.registerForm.controls['apellidos'].errors != null) {
      const apellidosValidation: any = this.registerForm.controls['apellidos'].errors;
      
      if (Object.keys(apellidosValidation)[0] === 'required') {
        this.errorMessages.apellidos = 'Apellidos es obligatorio';
      }
      
    }

    if (this.registerForm.controls['dni'].errors != null) {
      const dniValidation: any = this.registerForm.controls['dni'].errors;
      
      if (Object.keys(dniValidation)[0] === 'required') {
        this.errorMessages.dni = 'El dni es obligatorio';
      }
      
    }

    if (this.registerForm.controls['correo'].errors != null) {
      const correoValidation: any = this.registerForm.controls['correo'].errors;

      if (Object.keys(correoValidation)[0] === 'required') {
        this.errorMessages.correo = 'El correo es requerido';
      }
      
      if (Object.keys(correoValidation)[0] === 'email') {
        this.errorMessages.correo = 'El formato correo es incorrecto';
      }
      
    }

    if (this.registerForm.controls['password'].errors != null) {
      const passwordValidation: any = this.registerForm.controls['password'].errors;
      
      if (Object.keys(passwordValidation)[0] === 'required') {
        this.errorMessages.password = 'La contraseña es obligatoria';
      }
      
    }
    
  }

  cleanErrorMessages() {
    this.errorMessages = {
      nombres : '',
      apellidos : '',
      dni : '',
      correo : '',
      password : '',
      backendResponseMessage: ''
    };
  }

  cleanFormValues() {
    this.registerForm.controls['nombres'].setValue('');
    this.registerForm.controls['apellidos'].setValue('');
    this.registerForm.controls['dni'].setValue('');
    this.registerForm.controls['correo'].setValue('');
    this.registerForm.controls['password'].setValue('');

    this.registerForm.markAsPristine();
    this.registerForm.markAsUntouched();

    this.urlImage = null;

    this.fileProductImage = null;
    this.fileInputHTML.nativeElement.value = '';
  }

  onChange(event: any) {
    var reader = new FileReader();

    if (event.target.files.length > 0) {
      this.fileProductImage = event.target.files[0];
    }

    reader.onload = (event: any) => {
      this.urlImage = event.target.result;
    };

    reader.onerror = (event: any) => {
      console.log("File could not be read: " + event.target.error.code);
    };

    reader.readAsDataURL(event.target.files[0]);

  }

  onFocusInput(event: any) {
    event.target.parentNode.classList.add("is-focused");
  }

  onFocusOutInput(event: any, fieldName: string) {
    event.target.parentNode.classList.remove("is-focused");

    if (this.registerForm.controls[fieldName].value === null) {
      event.target.parentNode.classList.remove("is-filled");
      return;
    }

    if (this.registerForm.controls[fieldName].value != '') {
      event.target.parentNode.classList.add("is-filled");
      return;
    }

    if (this.registerForm.controls[fieldName].value === '') {
      event.target.parentNode.classList.remove("is-filled");
      return;
    }

  }

  cerrarModal() {
    this.activeModal.close();
  }

}
