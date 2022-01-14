import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/interfaces/productos';
import { ProductosService } from 'src/app/services/productos.service';
@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.component.html',
  styleUrls: ['./modal-producto.component.css']
})
export class ModalProductoComponent implements OnInit {

  @Input('verProducto') verProducto!: Producto;

  @ViewChild('fileInput') fileInputHTML: any;
  public urlImage: any;
  public fileProductImage: any = null;

  @ViewChild('modal', {static: true}) closebutton!: ElementRef;

  public isSubmited: boolean = false;

  public registerForm = this.fb.group({
    nombre: ['', [Validators.required]],
    descripcion: ['', Validators.required],
    tipo: ['', Validators.required],
    precio: [undefined, [Validators.min(0.01), Validators.required]],
    stock: [undefined, Validators.required],
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
              private productosService: ProductosService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log(this.verProducto);
    if (this.verProducto != undefined) {
      this.verDatosProducto();
    }
  }

  verDatosProducto(){
    this.registerForm.controls['nombre'].setValue(this.verProducto.nombre);
    this.registerForm.controls['descripcion'].setValue(this.verProducto.descripcion);
    this.registerForm.controls['tipo'].setValue(this.verProducto.tipo);
    this.registerForm.controls['precio'].setValue(this.verProducto.precio);
    this.registerForm.controls['stock'].setValue(this.verProducto.stock);
    this.urlImage = this.verProducto.urlFoto;

    this.registerForm.controls['nombre'].disable();
    this.registerForm.controls['descripcion'].disable();
    this.registerForm.controls['tipo'].disable();
    this.registerForm.controls['precio'].disable();
    this.registerForm.controls['stock'].disable();
  }

  registarProducto(producto: Producto) {
    this.productosService.registrarProducto(producto).subscribe({
      next: this.handleLoginResponse.bind(this),
      error: this.handleLoginError.bind(this)
   });
   
  }

  handleLoginResponse(response: any) {
    this.isSubmited =false;

    if (this.fileProductImage != null) {
      // Subiendo imagen  
      this.productosService.registrarImagenPorId(this.fileProductImage, response.headers.get('id'))
      .subscribe({
          next: this.handleImageRegisterOk.bind(this),
          error: this.handleImageRegisterError.bind(this)
      });
    } else {
      this.toastr.success('Se registró el producto satisfactoriamente', 'Registro Satisfactorio!');
    }  
  }

  handleLoginError(response: any) {
    if (response.status === 401) {
      this.errorMessages.backendResponseMessage = 'Credenciales incorrectas';
    } else {
      this.errorMessages.backendResponseMessage = 'Error técnico, debe contactarse con el administrador'
    }
  }

  handleImageRegisterOk(response: any) {
    this.cleanErrorMessages();
    this.cleanFormValues();
    this.closebutton.nativeElement.click();
    this.toastr.success('Se culminó el proceso satisfactoriamente', 'Registro Satisfactorio!');
  }

  handleImageRegisterError(response: any) {
    this.cleanErrorMessages();
    this.cleanFormValues();
    this.closebutton.nativeElement.click();
    this.toastr.warning('No se pudo registrar la imagen, contacte con el administrador', 'Registro incompleto');
  }

  onSubmit() {
    console.log("Submit");
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {

      this.setErrorMessage();
      this.isSubmited = true;

    } else {

      this.registarProducto(this.registerForm.value); 

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
        this.errorMessages.precio = 'El precio es requerido';
      }
      
      if (Object.keys(precioValidation)[0] === 'min') {
        this.errorMessages.precio = 'El precio debe ser mayor o igual a 0.01';
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
