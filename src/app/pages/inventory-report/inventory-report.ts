import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../services/report.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-inventory-report',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './inventory-report.html',
  styleUrl: './inventory-report.css'
})
export class InventoryReport implements OnInit {
  inventoryData: any[] = [];

  // Chart configuration
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: '#94a3b8' },
        grid: { color: 'rgba(255,255,255,0.05)' }
      },
      y: {
        min: 0,
        ticks: { color: '#94a3b8' },
        grid: { color: 'rgba(255,255,255,0.05)' }
      }
    },
    plugins: {
      legend: {
        display: true,
        labels: { color: '#f8fafc', font: { family: 'Outfit', size: 12 } }
      },
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Stock Actuel',
        backgroundColor: '#6366f1',
        borderRadius: 8
      },
      {
        data: [],
        label: 'Ventes',
        backgroundColor: '#f43f5e',
        borderRadius: 8
      }
    ]
  };

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.reportService.searchQuery$.subscribe(query => {
      const allData = this.reportService.getInventoryData();
      if (!query) {
        this.inventoryData = allData;
      } else {
        const q = query.toLowerCase();
        this.inventoryData = allData.filter(item =>
          item.product.toLowerCase().includes(q)
        );
      }
      this.setupChart();
    });
  }

  setupChart() {
    this.barChartData.labels = this.inventoryData.map(item => item.product);
    this.barChartData.datasets[0].data = this.inventoryData.map(item => item.stock);
    this.barChartData.datasets[1].data = this.inventoryData.map(item => item.sales);
  }

  exportExcel() {
    this.reportService.exportToExcel(this.inventoryData, 'Etat_Stocks');
  }
}
