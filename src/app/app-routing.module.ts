import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExpensesComponent} from './expenses/expenses.component';
import {ExpenseComponent} from './expense/expense.component';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'expenses'
  },
  {
    path: 'expenses',
    component: ExpensesComponent
  },
  {
    path: 'expense',
    component: ExpenseComponent
  },
  {
    path: 'expense/:id',
    component: ExpenseComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false, // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AppRoutingModule { }
