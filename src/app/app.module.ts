import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {Router} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule, MatButtonModule, MatIconModule, MatDialogModule,
  MatProgressSpinnerModule, MatGridListModule} from '@angular/material';
import 'hammerjs';
import { ExpensesComponent } from './expenses/expenses.component';
import {AppRoutingModule} from './app-routing.module';
import {BillRegistryService} from './bill-registry.service';
import {HttpModule} from '@angular/http';
import { LoaderDialogComponent } from './loader-dialog/loader-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ExpensesComponent,
    LoaderDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    MatToolbarModule, MatButtonModule, MatIconModule, MatDialogModule, MatProgressSpinnerModule, MatGridListModule,
    BrowserAnimationsModule,
  ],
  providers: [BillRegistryService],
  bootstrap: [AppComponent],
  entryComponents: [LoaderDialogComponent]
})
export class AppModule {
  constructor() { }
}
