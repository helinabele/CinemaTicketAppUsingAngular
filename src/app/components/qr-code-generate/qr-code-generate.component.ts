import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr-code-generate',
  templateUrl: './qr-code-generate.component.html',
  styleUrls: ['./qr-code-generate.component.scss'],
})
export class QrCodeGenerateComponent implements OnInit {
  public myAngularxQrCode: string;
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
}
