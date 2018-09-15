import { Component, OnInit } from '@angular/core';
import { LoaderService } from './service/loader.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  name = 'Angular';
  showLoader: boolean;

  constructor(
    private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });
  }
}