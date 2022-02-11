import { Component, OnInit, ViewChild } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-qr-code-generate',
  templateUrl: './qr-code-generate.component.html',
  styleUrls: ['./qr-code-generate.component.scss'],
})
export class QrCodeGenerateComponent implements OnInit {
  public myAngularxQrCode: string;
  link: string;

  @ViewChild('qrcode', { static: true }) qrcode: QRCodeComponent;
  item = [
    {
      name: 'Agatha Harkness',
      'played by': 'Kathryn Hahn',
      'Fictional universe': 'Marvel Universe',
      Creator: 'Stan Lee',
    },
  ];
  qrInfo = JSON.stringify(this.item);
  constructor() {
    this.myAngularxQrCode = 'ItSoluionStuff.com';
  }

  ngOnInit(): void {}

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
