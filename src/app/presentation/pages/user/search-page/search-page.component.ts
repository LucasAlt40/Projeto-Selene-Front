import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent {
  searchTerm: string = '';
  allEvents = [
    { id: 1, title: 'Evento de Tecnologia' },
    { id: 2, title: 'Feira de Startups' },
    { id: 3, title: 'Hackathon 2025' },
  ];
  searchResults = [...this.allEvents];

  onSearch() {
    const term = this.searchTerm.toLowerCase();
    this.searchResults = this.allEvents.filter((event) =>
      event.title.toLowerCase().includes(term)
    );
  }
}
