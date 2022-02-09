import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public arrayPath: String[] = [];
  private ngUnsubscribe = new Subject();
  public username = localStorage.getItem('user');

  constructor(private router: Router) { 
    this.router.events.subscribe(event => this.setUrlToBreadcrumb());
  }
  
  ngOnInit(): void {
  }
  
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

  setUrlToBreadcrumb() {
    this.arrayPath = this.router.url.split('/');
    // console.log(this.arrayPath);
  }



}
