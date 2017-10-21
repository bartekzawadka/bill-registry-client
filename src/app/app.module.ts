import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule, MatButtonModule, MatIconModule, MatDialogModule,
  MatProgressSpinnerModule, MatGridListModule, MatListModule,
  MatCardModule, MatPaginatorModule, MatFormFieldModule, MatInputModule,
  MatExpansionModule, MatTooltipModule, MatSelectModule} from '@angular/material';
import 'hammerjs';
import { ExpensesComponent } from './expenses/expenses.component';
import {AppRoutingModule} from './app-routing.module';
import {BillRegistryService} from './bill-registry.service';
import {HttpModule} from '@angular/http';
import { LoaderDialogComponent } from './loader-dialog/loader-dialog.component';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ExpenseComponent } from './expense/expense.component';
import {NgxCurrencyModule} from 'ngx-currency';
import {Globals} from './globals';
import { BillAcquisitionComponent } from './bill-acquisition/bill-acquisition.component';
import { ImageEnlargeComponent } from './image-enlarge/image-enlarge.component';
import { FilesListComponent } from './files-list/files-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ExpensesComponent,
    LoaderDialogComponent,
    MessageDialogComponent,
    ExpenseComponent,
    BillAcquisitionComponent,
    ImageEnlargeComponent,
    FilesListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FlexLayoutModule,
    MatToolbarModule, MatButtonModule, MatIconModule, MatDialogModule, MatProgressSpinnerModule, MatGridListModule,
    MatListModule, MatCardModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatExpansionModule,
    MatTooltipModule, MatSelectModule,
    BrowserAnimationsModule,
    NgxCurrencyModule,
    FormsModule
  ],
  providers: [BillRegistryService, Globals],
  bootstrap: [AppComponent],
  entryComponents: [LoaderDialogComponent, MessageDialogComponent, BillAcquisitionComponent, ImageEnlargeComponent]
})
export class AppModule {
  constructor() { }
}
