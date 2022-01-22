import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieListService } from 'src/app/components/movie-list/movie-list.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss'],
})
export class PersonalInformationComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private _movieListService: MovieListService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: [
        '',
        [
          Validators.minLength(6),
          this.isAddMode ? Validators.required : Validators.nullValidator,
        ],
      ],
      confirmPassword: [
        '',
        this.isAddMode ? Validators.required : Validators.nullValidator,
      ],
    });
  }
  onSubmit() {
    console.log(this.form.value);
    this._movieListService.insertMovies(this.form.value).subscribe(
      (response) => console.log('success', response),
      (error) => console.error('Error', error)
    );
  }
}
