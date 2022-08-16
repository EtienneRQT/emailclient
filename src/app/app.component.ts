import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public title: string = 'emailclient';
  public signedIn$: BehaviorSubject<boolean | null>;

  constructor(private authService: AuthService, private router: Router) {
    this.signedIn$ = this.authService.signedIn$;
  }

  ngOnInit(): void {
    this.authService.checkAuth().subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
