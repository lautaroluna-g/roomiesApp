import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-error404-page',
  templateUrl: './error404-page.component.html',
  styles: ``
})
export class Error404PageComponent implements OnInit {

  constructor(private headerService: HeaderService) {}

  ngOnInit() {
    this.headerService.setTitle('404 Not found', 'pi pi-info-circle');
  }

}
