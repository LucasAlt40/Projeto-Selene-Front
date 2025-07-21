import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { CommonModule, DatePipe } from '@angular/common';
import { EventApiService } from '../../../../core/api/services/event.api.service';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { TextareaModule } from 'primeng/textarea';
import { DatePickerModule } from 'primeng/datepicker';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-event-details-page',
  imports: [
    SkeletonModule,
    FormsModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    CalendarModule,
    ButtonModule,
    FileUploadModule,
    DropdownModule,
    DatePickerModule,
    TextareaModule,
  ],
  templateUrl: './event-details-page.component.html',
})
export class EventDetailsPageComponent {
  id!: number;
  event: any;
  loading = true;
  error: string | null = null;

  selectedCategoryId: number | null = null;
  categories: { id: number; name: string }[] = [];

  selectedImageFile: File | null = null;
  previewUrl: string | null = null;

  loadingSubmit = false;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventApiService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.getEvent();
    this.getEventCategories();
  }

  getEvent(): void {
    this.loading = true;
    this.eventService.getEventById(this.id).subscribe({
      next: (res) => {
        this.event = res;
        this.previewUrl = environment.imagesBaseUrl + res.previewImageUrl;
        this.loading = false;
      },
      error: () => {
        this.error = 'Não foi possível carregar os dados do evento.';
        this.loading = false;
      },
    });
  }

  getEventCategories() {
    this.eventService.getCategories().subscribe({
      next: (res) => {
        console.log('Categorias carregadas:', res);
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
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    if (!this.selectedImageFile) {
      alert('Por favor, selecione uma imagem.');
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
        alert('Evento criado com sucesso!');
        this.router.navigate(['/eventos/', res.id]);
        this.loadingSubmit = false;
      },
      error: (err) => {
        console.error('Erro ao criar evento:', err);
        alert('Erro ao criar evento');
        this.loadingSubmit = false;
      },
    });
  }
}
