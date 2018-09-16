import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { QuestionComponent } from './question/question.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard }            from './service/auth-guard.service';
import * as routers  from './constants/routing';

const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: routers.login, component: LoginComponent },
  { path: routers.register, component: RegistrationComponent },
  { path: routers.search, component: SearchComponent, canActivate: [AuthGuard] },
  { path: routers.results, component: SearchResultsComponent, canActivate: [AuthGuard] },
  { path: `${routers.question}/:id`, component: QuestionComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }