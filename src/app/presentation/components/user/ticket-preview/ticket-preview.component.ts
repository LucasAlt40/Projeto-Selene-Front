import { Component, Input } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { TicketResponseDto } from '../../../../core/model/ticket.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ticket-preview',
  imports: [DatePipe],
  templateUrl: './ticket-preview.component.html',
})
export class TicketPreviewComponent {
  imageBase = environment.imagesBaseUrl
  @Input() ticket!: TicketResponseDto;

  constructor() {}
}
