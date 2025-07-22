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
import { TextareaModule } from 'primeng/textarea';
import { MessageService } from 'primeng/api';
import { EventApiService } from '../../../../core/api/services/event.api.service';
import { ToastModule } from 'primeng/toast';

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
    TextareaModule,
    ToastModule,
  ],
  providers: [MessageService],
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
      number: 0,
    },
  };

  selectedCategoryId: number | null = null;
  categories: { id: number; name: string }[] = [];

  selectedImageFile: File | null = null;
  previewUrl: string | null = null;

  loadingSubmit = false;

  constructor(
    private eventService: EventApiService,
    private datePipe: DatePipe,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.eventService.getCategories().subscribe({
      next: (res) => {
        console.log('Categorias carregadas:', res);
        this.categories = res;
      },
      error: (err) => {
        console.error('Erro ao carregar categorias', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar categorias',
          life: 5000,
        });
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
    if (this.loadingSubmit) return;

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
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Preencha todos os campos obrigatórios.',
        life: 5000,
      });
      return;
    }

    if (!this.selectedImageFile) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Por favor, selecione uma imagem.',
        life: 5000,
      });
      return;
    }

    this.loadingSubmit = true;

    const payload = {
      ...this.event,
      date: this.datePipe.transform(this.event.date, "yyyy-MM-dd'T'HH:mm:ss")!,
      categoryId: this.selectedCategoryId!,
      address: {
        ...this.event.address,
        number: this.event.address.number!,
      },
    };

    this.eventService.createEvent(payload, this.selectedImageFile).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Evento criado com sucesso!',
          life: 5000,
        });
        this.router.navigate(['/eventos/', res.id]);
        this.loadingSubmit = false;
      },
      error: (err) => {
        console.error('Erro ao criar evento:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao criar evento',
          life: 5000,
        });
        this.loadingSubmit = false;
      },
    });
  }
}
