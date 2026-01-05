import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    private searchSubject = new BehaviorSubject<string>('');
    searchQuery$ = this.searchSubject.asObservable();

    setSearchQuery(query: string) {
        this.searchSubject.next(query);
    }

    private financialData = [
        { id: 1, date: '2025-12-01', description: 'Vente Logiciel SaaS', category: 'Ventes', amount: 1500.00, status: 'Payé' },
        { id: 2, date: '2025-12-05', description: 'Achat Serveurs AWS', category: 'Infrastructure', amount: -450.00, status: 'Payé' },
        { id: 3, date: '2025-12-10', description: 'Consultance Expert AI', category: 'Services', amount: 2500.00, status: 'En attente' },
        { id: 4, date: '2025-12-15', description: 'Licences Adobe Creative', category: 'Logiciels', amount: -120.00, status: 'Payé' },
        { id: 5, date: '2025-12-20', description: 'Vente Formation Web', category: 'Ventes', amount: 800.00, status: 'Payé' },
        { id: 6, date: '2025-12-25', description: 'Loyer Bureau', category: 'Charges', amount: -1200.00, status: 'Payé' },
    ];

    private inventoryData = [
        { product: 'MacBook Pro M3', stock: 15, sales: 45, value: 37500 },
        { product: 'iPad Air', stock: 25, sales: 60, value: 15000 },
        { product: 'Magic Keyboard', stock: 50, sales: 30, value: 5000 },
        { product: 'Studio Display', stock: 8, sales: 12, value: 12000 },
    ];

    getFinancialData() {
        return [...this.financialData];
    }

    getInventoryData() {
        return [...this.inventoryData];
    }

    addFinancialReport(report: any) {
        this.financialData.unshift({
            id: this.financialData.length + 1,
            ...report
        });
    }

    searchReports(query: string) {
        const q = query.toLowerCase();
        return {
            financial: this.financialData.filter(f =>
                f.description.toLowerCase().includes(q) ||
                f.category.toLowerCase().includes(q)
            ),
            inventory: this.inventoryData.filter(i =>
                i.product.toLowerCase().includes(q)
            )
        };
    }

    exportToPDF(filename: string, title: string, headers: string[][], data: any[][]) {
        const doc = new jsPDF();

        // Add title
        doc.setFontSize(18);
        doc.text(title, 14, 22);
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Généré le: ${new Date().toLocaleString()}`, 14, 30);

        autoTable(doc, {
            head: headers,
            body: data,
            startY: 40,
            styles: { fontSize: 10, cellPadding: 5 },
            headStyles: { fillColor: [99, 102, 241], textColor: 255 },
            alternateRowStyles: { fillColor: [245, 247, 250] },
        });

        doc.save(`${filename}.pdf`);
    }

    exportToExcel(data: any[], filename: string) {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Rapport');
        XLSX.writeFile(workbook, `${filename}.xlsx`);
    }
}
