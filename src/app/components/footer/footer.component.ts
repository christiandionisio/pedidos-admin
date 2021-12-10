import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public actualYear: number = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
    console.log(this.actualYear);
  }

}
