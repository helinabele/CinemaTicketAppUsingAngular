import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  constructor(private _route: ActivatedRoute, private _router: Router) {}

  ngOnInit(): void {}

  goBack() {
    window.history.back();
  }

  goHome() {
    this._router.navigate(['/home']);
  }
}
