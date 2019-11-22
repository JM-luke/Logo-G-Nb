import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Url } from 'url';
import { environment } from '../../environments/environment';

@Component({
  selector: 'ngx-outlook',
  templateUrl: './outlook.component.html',
  styleUrls: ['./outlook.component.scss'] 
})

export class OutlookComponent implements OnInit {
  public data: any = null;
  constructor(private httpClient: HttpClient) {
    const url = 'outlook' ;

    httpClient.get(`${environment.baseUrl}/${url}`).subscribe(apiData => {
      this.data = apiData;
      console.log(`Data :`);
      console.log(apiData);
    });
    
  }
  ngOnInit() {
  }

}
