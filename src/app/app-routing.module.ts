import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { QrCodeGenerateComponent } from './components/qr-code-generate/qr-code-generate.component';
import { SitReservationDetailComponent } from './components/sit-reservation/sit-reservation-detail.component';
import { SitReservationComponent } from './components/sit-reservation/sit-reservation.component';
import { ErrorComponent } from './layout/error/error.component';

const routes: Routes = [
  { path: '', redirectTo: 'movie-list', pathMatch: 'full' },
  { path: 'movie-list', component: MovieListComponent },
  {
    path: 'sit-reservation/:id',
    component: SitReservationComponent,
  },
  {
    path: 'sit-reservation-detail/:scheduleId/:layoutId',
    component: SitReservationDetailComponent,
  },
  {
    path: 'qr-code-generate/:scheduleId/:layoutId',
    component: QrCodeGenerateComponent,
  },
  { path: 'about', component: AboutComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const routingComponents = [
  HomeComponent,
  AboutComponent,
  MovieListComponent,
];
