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
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { DatePipe } from '@angular/common';
import { MovieListService } from './components/movie-list/movie-list.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { SitReservationComponent } from './components/sit-reservation/sit-reservation.component';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { PaymentComponent } from './components/payment/payment.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { SitReservationDetailComponent } from './components/sit-reservation/sit-reservation-detail.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatVideoModule } from 'mat-video';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatVideoModule,
    NgbModule,
    FontAwesomeModule,
    MatListModule,
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
