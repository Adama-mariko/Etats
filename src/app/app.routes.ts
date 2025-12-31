import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { FinancialReport } from './pages/financial-report/financial-report';
import { InventoryReport } from './pages/inventory-report/inventory-report';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: Dashboard },
    { path: 'financial-report', component: FinancialReport },
    { path: 'inventory-report', component: InventoryReport },
];
