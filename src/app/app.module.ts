import { ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from './material-module/material-module.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";
import { CardsModule, CheckboxModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing-module';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { SettingsLayoutComponent } from './layouts/settings-layout/settings-layout.component';
import { SettingsSidebarComponent } from './settings-sidebar/settings-sidebar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SettingsLayoutModule } from './layouts/settings-layout/settings-layout.module';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    
  ],
  imports: [
    BrowserAnimationsModule,
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    CardsModule,
    CheckboxModule,
    WavesModule,
    AppRoutingModule,
    SettingsLayoutModule,
    AdminLayoutModule,
    ReactiveFormsModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
