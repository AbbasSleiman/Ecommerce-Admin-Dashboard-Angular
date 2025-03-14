import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IonButton, IonContent, IonInput } from '@ionic/angular/standalone';
import { AuthenticateService } from '../../guards/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, IonButton, IonInput, IonContent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // create a formGroup with its controls and validators
  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z]*'),
      Validators.minLength(5),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthenticateService,
    private router: Router
  ) {}

  // Submit function
  handleSubmit() {
    this.authService
      .authenticateUser(
        this.loginForm.value.username!,
        this.loginForm.value.password!
      )
      .subscribe(response => {
        this.authService.setUserId(response!);
      });

    if (this.authService.getUserId() !== null) {
      this.router.navigate(['']);
    }
  }
}
