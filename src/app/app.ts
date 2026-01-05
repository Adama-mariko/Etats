import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportService } from './services/report.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Sidebar, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'report-app';
  today = new Date();
  isLightTheme = false;
  searchQuery = '';
  showModal = false;

  constructor(private reportService: ReportService) { }

  newReport = {
    date: new Date().toISOString().split('T')[0],
    description: '',
    category: 'Ventes',
    amount: 0,
    status: 'Payé'
  };

  toggleTheme() {
    this.isLightTheme = !this.isLightTheme;
    if (this.isLightTheme) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }

  onSearch() {
    this.reportService.setSearchQuery(this.searchQuery);
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  submitReport() {
    console.log('New Report:', this.newReport);
    this.reportService.addFinancialReport({ ...this.newReport });
    // Close modal after submission
    this.showModal = false;
    // Reset form
    this.newReport = {
      date: new Date().toISOString().split('T')[0],
      description: '',
      category: 'Ventes',
      amount: 0,
      status: 'Payé'
    };
    alert('Rapport ajouté avec succès !');
  }
}
