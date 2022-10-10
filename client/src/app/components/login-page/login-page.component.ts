import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  username = '';
  password = '';
  status = 'OK';
  authToken = '';

  constructor(private router: Router, private authService: AuthService,) {}


  onLogin(): void {
    this.status = 'Loggin in...';

    const signupData = {
      username: this.username,
      password: this.password,
    };
    
    this.authService.login(signupData).subscribe({
      next: (data) => {
        this.authService.setAuthToken(data.id_token)
        this.status = 'logged in';
        this.router.navigateByUrl('');
      },
      error: (err) => {
        console.log(err);
        this.status = 'Incorect username or password';
      },
    });
  }
}
