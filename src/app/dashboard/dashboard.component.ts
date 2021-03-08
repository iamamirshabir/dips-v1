import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  greeting = {};

  constructor(private app: AppService,private http: HttpClient) { 

    http.get('resource').subscribe(data => this.greeting = data);

  }

  ngOnInit(): void {
  }
  authenticated() {
    return this.app.authenticated;
  }
  

}
