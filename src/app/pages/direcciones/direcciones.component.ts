import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DireccionesService } from 'src/app/services/direcciones.service';

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.css']
})
export class DireccionesComponent implements OnInit {

  listaDirecciones: any = [];

  constructor(private route: ActivatedRoute, 
    private direccionesService: DireccionesService) { 
  }

  ngOnInit(): void {
    
    this.direccionesService.getDireccionesByIdCliente(this.route.snapshot.paramMap.get('idCliente')!)
      .subscribe((resp) => {
        this.listaDirecciones = resp;
        console.log(this.listaDirecciones);
        
      });
    
  }

}
