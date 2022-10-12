import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { TodoPageComponent } from './components/todo-page/todo-page.component';

const routes: Routes = [
  { path: 'todolist', component: TodoPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: '', redirectTo: '/todolist', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
