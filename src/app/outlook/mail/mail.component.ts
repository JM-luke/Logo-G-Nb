import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Url } from 'url';
import { environment } from '../../../environments/environment';
import { MailDataInterface } from '../models/mailData.model';

@Component({
  selector: 'ngx-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent implements OnInit {
      
  public messages: MailDataInterface = null;
  constructor(private httpClient: HttpClient) {
    const url = 'outlook/mail' ;

    httpClient.get<MailDataInterface>(`${environment.baseUrl}/${url}`).subscribe(apiData => {
      this.messages = apiData;
      console.log(`Data :`);
      console.log(apiData);
    });
  }

  ngOnInit() {
  }

}
