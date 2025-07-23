import { Component, Input } from '@angular/core';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-logo',
  imports: [ImageModule],
  templateUrl: './logo.component.html',
})
export class LogoComponent {
  @Input() width: string = '100';
}
