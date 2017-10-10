import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule, MatButtonModule, MatIconModule, MatDialogModule,
  MatProgressSpinnerModule, MatGridListModule, MatListModule,
  MatCardModule} from '@angular/material';
import 'hammerjs';
import { ExpensesComponent } from './expenses/expenses.component';
import {AppRoutingModule} from './app-routing.module';
import {BillRegistryService} from './bill-registry.service';
import {HttpModule} from '@angular/http';
import { LoaderDialogComponent } from './loader-dialog/loader-dialog.component';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
  declarations: [
    AppComponent,
    ExpensesComponent,
    LoaderDialogComponent,
    MessageDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FlexLayoutModule,
    MatToolbarModule, MatButtonModule, MatIconModule, MatDialogModule, MatProgressSpinnerModule, MatGridListModule,
    MatListModule, MatCardModule,
    BrowserAnimationsModule,
  ],
  providers: [BillRegistryService],
  bootstrap: [AppComponent],
  entryComponents: [LoaderDialogComponent, MessageDialogComponent]
})
export class AppModule {
  constructor() { }
}
