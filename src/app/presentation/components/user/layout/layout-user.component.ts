import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-user',
  imports: [HeaderComponent, RouterOutlet, RouterModule],
  templateUrl: './layout-user.component.html',
  styleUrl: './layout-user.component.css'
})
export class LayoutUserComponent {

}
