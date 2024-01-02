import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmailComponent } from './create-email/create-email.component';

const routes: Routes = [
  { path: 'createEmail', component: CreateEmailComponent },
  { path: '', redirectTo: '/createEmail', pathMatch: 'full' },
  { path: '**', component: CreateEmailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
