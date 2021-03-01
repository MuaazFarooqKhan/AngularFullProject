
import { AdminLayoutComponent } from './admin-layout.component';
import { FixedPluginModule } from './../../shared/fixedplugin/fixedplugin.module';
import { FooterModule } from './../../shared/footer/footer.module';
import { NavbarModule } from './../../shared/navbar/navbar.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewSalesComponent } from './../../pages/view-sales/view-sales.component';
import { ViewVendorComponent } from './../../pages/view-vendor/view-vendor.component';
import { PosInvoiceComponent } from './../../pages/pos-invoice/pos-invoice.component';
import { TestcomponentComponent } from './../../pages/testcomponent/testcomponent.component';
import { Globalb2bComponent } from './../../pages/globalb2b/globalb2b.component';
import { BroadcastComponent, DialogOverviewExampleDialog } from './../../pages/broadcast/broadcast.component';
import { InventoryViewComponent } from './../../pages/inventory-view/inventory-view.component';
import { InventoryFormComponent } from './../../pages/inventory-form/inventory-form.component';
import { InventoryComponent } from './../../pages/inventory/inventory.component';
import { VendorFormComponent } from './../../pages/vendor-form/vendor-form.component';
import { DemoMaterialModule } from './../../material-module/material-module.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PosComponent } from 'app/pages/pos/pos.component';
import { SaleFormComponent } from 'app/pages/sale-form/sale-form.component';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { NgxPrintModule } from 'ngx-print';
import { SidebarModule } from 'app/sidebar/sidebar.module';
import { AdminLayoutRoutingModule } from './admin-layout.routing-module';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReportComponent } from '../../pages/report/report.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    DemoMaterialModule,
    PDFExportModule,
    NgxPrintModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
    SidebarModule,
    AdminLayoutRoutingModule,
    HttpClientModule,
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    PosComponent,
    VendorFormComponent,
    SaleFormComponent,
    InventoryComponent,
    InventoryFormComponent,
    InventoryViewComponent,
    BroadcastComponent,
    Globalb2bComponent,
    TestcomponentComponent,
    PosInvoiceComponent,
    DialogOverviewExampleDialog,
    ViewVendorComponent,
    ViewSalesComponent,
    AdminLayoutComponent,
    ReportComponent,
  ],
  entryComponents: [
    DialogOverviewExampleDialog
  ],
  exports: [
    RouterModule
  ]
  

})
export class AdminLayoutModule { }
