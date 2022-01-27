import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { ErrorComponent } from './layout/error/error.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ProfilesComponent } from './layout/profiles/profiles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MovieListService } from './components/movie-list/movie-list.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { SitReservationComponent } from './components/sit-reservation/sit-reservation.component';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { PaymentComponent } from './components/payment/payment.component';
import { MatInputModule } from '@angular/material/input';
import { SitReservationDetailComponent } from './components/sit-reservation/sit-reservation-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    HomeComponent,
    AboutComponent,
    NavbarComponent,
    ErrorComponent,
    FooterComponent,
    ProfilesComponent,
    SitReservationComponent,
    PersonalInformationComponent,
    PaymentComponent,
    SitReservationDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    FontAwesomeModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
  ],
  exports: [MatInputModule],
  providers: [
    DatePipe,
    MovieListComponent,
    SitReservationComponent,
    MovieListService,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
