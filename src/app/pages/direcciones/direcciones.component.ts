import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.css']
})
export class DireccionesComponent implements OnInit {

  constructor(private activatedRoute: Router) { 
    console.log(this.activatedRoute.getCurrentNavigation()?.extras);
  }

  ngOnInit(): void {
    
    
  }

}
