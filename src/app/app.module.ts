import { NgModule }      from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './custom-reuse.strategy';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }    from '@angular/common/http';
import { AppComponent }  from './app.component';
import { AppRoutingModule }     from './app-routing.module';
import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { QuestionComponent } from './question/question.component';
import { QuickPanelComponent } from './quick-panel/quick-panel.component';
import { LoaderService } from './service/loader.service';
import { AuthGuard }            from './service/auth-guard.service';
import { AuthService }          from './service/auth.service';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports:      [
    NgbModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    SearchComponent,
    SearchResultsComponent,
    QuestionComponent,
    QuickPanelComponent,
    LoginComponent,
    HeaderComponent,
    RegistrationComponent
  ],
  providers: [
    LoaderService,
    NgbActiveModal,
    AuthGuard,
    AuthService,
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}
  ],
  bootstrap: [ AppComponent ],
  entryComponents: [ QuickPanelComponent ]
})
export class AppModule {}