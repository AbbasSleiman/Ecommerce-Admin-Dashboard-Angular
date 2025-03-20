import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IonButton, IonContent, IonInput } from '@ionic/angular/standalone';
import { AuthenticateService } from '../../guards/authenticate.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, IonButton, IonInput, IonContent, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  // create a formGroup with its controls and validators
  signUpForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z]*'),
      Validators.minLength(5),
      Validators.maxLength(25),
    ]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$'),
    ]),
  });

  constructor(
    private authService: AuthenticateService,
    private router: Router
  ) {}

  // Submit function
  handleSubmit() {
    this.authService
      .authenticateUser(
        this.signUpForm.value.username!,
        this.signUpForm.value.password!
      )
      .subscribe(response => {
        this.authService.setUserId(response!);
      });

    if (this.authService.getUserId() !== null) {
      this.router.navigate(['']);
    }
  }
}
