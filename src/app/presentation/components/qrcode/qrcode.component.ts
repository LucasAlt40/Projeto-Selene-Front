import { Component, Input, input } from '@angular/core';
import { QrCodeComponent } from 'ng-qrcode';

@Component({
  selector: 'app-qrcode',
  imports: [QrCodeComponent],
  templateUrl: './qrcode.component.html',
  styleUrl: './qrcode.component.css'
})
export class QrcodeComponent {
  @Input() value!: string;
  @Input() size: number = 200;
}
