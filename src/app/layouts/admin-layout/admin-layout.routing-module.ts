import { DashboardComponent } from './../../pages/dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout.component';
import { ViewSalesComponent } from './../../pages/view-sales/view-sales.component';
import { ViewVendorComponent } from './../../pages/view-vendor/view-vendor.component';
import { PosInvoiceComponent } from './../../pages/pos-invoice/pos-invoice.component';
import { TestcomponentComponent } from './../../pages/testcomponent/testcomponent.component';
import { Globalb2bComponent } from './../../pages/globalb2b/globalb2b.component';
import { BroadcastComponent } from './../../pages/broadcast/broadcast.component';
import { InventoryViewComponent } from './../../pages/inventory-view/inventory-view.component';
import { InventoryComponent } from './../../pages/inventory/inventory.component';
import { VendorFormComponent } from './../../pages/vendor-form/vendor-form.component';
import { Routes, RouterModule } from '@angular/router';

// import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { PosComponent } from 'app/pages/pos/pos.component';
import { SaleFormComponent } from 'app/pages/sale-form/sale-form.component';
import { InventoryFormComponent } from 'app/pages/inventory-form/inventory-form.component';
import { NgModule } from '@angular/core';
import { ReportComponent } from '../../pages/report/report.component';

const AdminLayoutRoutes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [{
            path: '',
            children: [
                { path: 'dashboard', component: DashboardComponent },
                { path: 'user', component: UserComponent },
                { path: 'table', component: TableComponent },
                { path: 'typography', component: TypographyComponent },
                { path: 'icons', component: IconsComponent },
                { path: 'maps', component: MapsComponent },
                { path: 'notifications', component: NotificationsComponent },
                { path: 'upgrade', component: UpgradeComponent },
                { path: 'pos', component: PosComponent },
                { path: 'add-vendor', component: VendorFormComponent },
                { path: 'add-sale', component: SaleFormComponent },
                { path: 'inventory', component: InventoryComponent },
                { path: 'add-inventory', component: InventoryFormComponent },
                { path: 'view-inventory', component: InventoryViewComponent },
                { path: 'broadcast', component: BroadcastComponent },
                { path: 'global-b2b', component: Globalb2bComponent },
                { path: 'test', component: TestcomponentComponent },
                { path: 'generate-invoice', component: PosInvoiceComponent },
                { path: 'view-vendor', component: ViewVendorComponent },
                { path: 'view-sales', component: ViewSalesComponent },
                { path: 'report', component: ReportComponent },

            ]
        }]
    },
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
    ],
    exports: [
        RouterModule
    ],
    declarations: [],
})
export class AdminLayoutRoutingModule { }
