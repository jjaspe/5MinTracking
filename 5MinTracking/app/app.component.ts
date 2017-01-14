import { Component, OnInit, ElementRef } from '@angular/core';


@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html'
})

export class AppComponent implements OnInit {
  constructor(private elementRef: ElementRef) { 
  }

  ngOnInit() {   
       
  }
}