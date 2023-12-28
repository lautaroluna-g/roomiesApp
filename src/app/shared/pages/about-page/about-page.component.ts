import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
})
export class AboutPageComponent implements OnInit {

  constructor(private headerService: HeaderService) {}

  ngOnInit() {
    this.headerService.setTitle('About', 'pi pi-info-circle');
  }

}
