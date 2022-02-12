import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QRCodeComponent } from 'angularx-qrcode';
import { ColumnModel } from 'src/app/shared/model/layout.model';
import { IMovie } from 'src/app/shared/model/movie.model';
import { ReservationListModel } from 'src/app/shared/model/reservationList.model';
import { SitReservationService } from '../sit-reservation/sit-reservation.service';
import { QrCodeGenerateService } from './qr-code-generate.service';

@Component({
  selector: 'app-qr-code-generate',
  templateUrl: './qr-code-generate.component.html',
  styleUrls: ['./qr-code-generate.component.scss'],
})
export class QrCodeGenerateComponent implements OnInit {
  public myAngularxQrCode: string;
  link: string;
  selectedSeats = '';
  movies: any;
  scheduleId: number;
  layoutId: number;

  @ViewChild('qrcode', { static: true }) qrcode: QRCodeComponent;

  qrInfo = '';

  constructor(
    private _qrCodeGenerateService: QrCodeGenerateService,
    private _sitReservationService: SitReservationService,
    private _route: ActivatedRoute
  ) {
    this.myAngularxQrCode = 'ItSoluionStuff.com';
  }

  ngOnInit() {
    this.selectedSeats = this._sitReservationService.getSeatsForApi()!;
    this.layoutId = this._route.snapshot.params['layoutId'];
    this.scheduleId = this._route.snapshot.params['scheduleId'];
    this.loadMovies();
  }

  loadMovies() {
    const layoutData: ReservationListModel = new ReservationListModel();
    layoutData.Seat_ResrvedList = this.selectedSeats;
    layoutData.No_of_Reserved = this.selectedSeats.split(',').length;
    layoutData.Ticket_LayoutID = this.layoutId;
    layoutData.TikSch_ID = this.scheduleId;
    this._qrCodeGenerateService.getlayout(layoutData).subscribe((data) => {
      this.qrInfo = data;
      debugger;
      this.movies = data;
      this._sitReservationService.resetSelectedSeats();
    });
  }

  downloadQRCode() {
    this.link = this.qrcode.qrcElement.nativeElement.firstChild.src;
    // const fileNameToDownload = 'image_qrcode';
    // const base64Img = document.getElementsByClassName('coolQRCode')[0].children[0]['src'];
    // fetch(base64Img)
    //    .then(res => res.blob())
    //    .then((blob) => {
    //       // IE
    //       if (window.navigator && window.navigator.msSaveOrOpenBlob){
    //          window.navigator.msSaveOrOpenBlob(blob,fileNameToDownload);
    //       } else { // Chrome
    //          const url = window.URL.createObjectURL(blob);
    //          const link = document.createElement('a');
    //          link.href = url;
    //          link.download = fileNameToDownload;
    //          link.click();
    //       }
    //    })
  }
}
