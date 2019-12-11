import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Url } from 'url';
import { environment } from '../../environments/environment';

import { AuthDataInterface } from './models/authData.model';

@Component({
  selector: 'ngx-outlook',
  templateUrl: './outlook.component.html',
  styleUrls: ['./outlook.component.scss'] 
})

export class OutlookComponent implements OnInit {


  public authData: AuthDataInterface = null;
  constructor(private httpClient: HttpClient) {
    const url = 'outlook' ;

    httpClient.get<AuthDataInterface>(`${environment.baseUrl}/${url}`).subscribe(apiData => {
      this.authData = apiData;
      console.log(`Data :`);
      console.log(apiData);
    });
    
  }

  ngOnInit() {
  }

}
