import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { DatePickerModule } from 'primeng/datepicker';
import { EventApiService } from '../../../../core/api/services/event.api.service';

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
    DropdownModule,
    DatePickerModule,
  ],
  templateUrl: './add-event-page.component.html',
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
      number: null as number | null,
    },
  };

  selectedCategoryId: number | null = null;
  categories: { id: number; name: string }[] = [];

  selectedImageFile: File | null = null;
  previewUrl: string | null = null;

  constructor(
    private eventService: EventApiService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventService.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (err) => {
        console.error('Erro ao carregar categorias', err);
        alert('Erro ao carregar categorias');
      },
    });
  }

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
      !address.zipCode ||
      !address.number ||
      !this.selectedCategoryId
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
      date: this.datePipe.transform(this.event.date, "yyyy-MM-dd'T'HH:mm:ss")!,
      categoryId: this.selectedCategoryId,
    };

    this.eventService.createEvent(payload, this.selectedImageFile).subscribe({
      next: (res) => {
        this.router.navigate(['admin/eventos/', res.id]);
      },
    });
  }
}
