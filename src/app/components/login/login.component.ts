import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterOutlet, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  errorMessage: string | null = null;

  private validUsername = 'Raul';
  private validPassword = '0214';
  private adminUsername = 'Keren';
  private adminPassword = '0223';

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
  
    if (this.loginForm.invalid) {
      return;
    }
  
    const { username, password } = this.loginForm.value;
  
    if ((username === this.validUsername && password === this.validPassword) || 
        (username === this.adminUsername && password === this.adminPassword)) {
      localStorage.setItem('token', 'simulated-token');
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Username o Password incorrectos';
    }
  }
}
