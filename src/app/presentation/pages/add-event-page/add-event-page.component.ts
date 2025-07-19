import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

import { EventApiService } from '../../../domain/api/services/event.api.service';

import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { DatePickerModule } from 'primeng/datepicker';


@Component({
  selector: 'app-add-event-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    CalendarModule,
    ButtonModule,
    FileUploadModule,
  ],
  templateUrl: './add-event-page.component.html',
  styleUrls: ['./add-event-page.component.css'],
})
export class AddEventPageComponent {
  event = {
    title: '',
    description: '',
    date: new Date(),
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
  };

  selectedImageFile: File | null = null;
  previewUrl: string | null = null;

  constructor(
    private eventService: EventApiService,
    private router: Router,
    private datePipe: DatePipe

  ) {}

  onImageUpload(event: { files: File[]; options?: any }) {
    const file = event?.files?.[0];
    if (file) {
      this.selectedImageFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }

    if (event?.options) {
      event.options.clear();
      event.options.complete();
    }
  }

  onSubmit() {
    const { title, description, address } = this.event;

    if (
      !title ||
      !description ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.zipCode
    ) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    if (!this.selectedImageFile) {
      alert('Por favor, selecione uma imagem.');
      return;
    }

    const payload = {
      ...this.event,
      date: this.datePipe.transform(new Date, "yyyy-MM-dd'T'HH:mm:ss")!
    };

    this.eventService.createEvent(payload, this.selectedImageFile).subscribe({
      next: () => {
        alert('Evento criado com sucesso!');
        this.router.navigate(['/event']);
      },
      error: (err) => {
        console.error('Erro ao criar evento:', err);
        alert('Erro ao criar evento');
      },
    });
  }
}
