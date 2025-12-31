import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-financial-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './financial-report.html',
  styleUrl: './financial-report.css'
})
export class FinancialReport implements OnInit {
  financialData: any[] = [];

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.financialData = this.reportService.getFinancialData();
  }

  exportPDF() {
    const headers = [['ID', 'Date', 'Description', 'Catégorie', 'Montant', 'Statut']];
    const data = this.financialData.map(item => [
      item.id,
      item.date,
      item.description,
      item.category,
      item.amount.toFixed(2) + ' €',
      item.status
    ]);
    this.reportService.exportToPDF('Rapport_Financier', 'Rapport Financier - Décembre 2025', headers, data);
  }

  exportExcel() {
    this.reportService.exportToExcel(this.financialData, 'Rapport_Financier');
  }
}
