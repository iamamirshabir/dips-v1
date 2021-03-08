import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'DIPS';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(private app: AppService,private http: HttpClient,private breakpointObserver: BreakpointObserver, private router: Router) {
    
    this.app.authenticate(undefined, undefined);
    
  }    
  logout() {
    this.http.post('logout', {}).lift(() => {
        this.app.authenticated = false;
        this.router.navigateByUrl('/login');
    }).subscribe();



}
}