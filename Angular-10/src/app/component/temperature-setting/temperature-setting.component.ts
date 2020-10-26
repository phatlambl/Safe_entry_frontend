import {TemperatureSettingServiceService} from './temperature-setting-service.sevice';
import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-temperature-setting',
  templateUrl: './temperature-setting.component.html',
  styleUrls: ['./temperature-setting.component.css']
})
export class TemperatureSettingComponent implements OnInit {

  emails: any;
  result: String | undefined;
  temperature: any;

  constructor(private http: HttpClient) {
  }

  postData() {
    const url = '/rest/temperature/config';
    this.http.post(url, {emails: this.emails, temperature: this.temperature}).toPromise().then((data: any) => {
      console.log(data);
    });
  }

  ngOnInit(): void {
  }
}
