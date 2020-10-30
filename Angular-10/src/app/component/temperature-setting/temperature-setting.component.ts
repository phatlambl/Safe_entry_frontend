import {TemperatureSettingServiceService} from './temperature-setting-service.sevice';
import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import { environment } from './../../../environments/environment.prod';

@Component({
  selector: 'app-temperature-setting',
  templateUrl: './temperature-setting.component.html',
  styleUrls: ['./temperature-setting.component.css']
})
export class TemperatureSettingComponent implements OnInit {

  emails: any;
  result: String | undefined;
  temperature: any;
  pageIndex: any;
  count = 0;
  public data: Object = [];
  total: any;

  constructor(private http: HttpClient) {
  }

  postData() {
    const url = '/rest/temperature/config';
    const url_list = '/rest/temperature/config/list';
    this.http.post(environment.endpoint + url, {emails: this.emails, temperature: this.temperature}).toPromise().then((data: any) => {
      console.log('post status: ', data);
      if (data.statusCode === 200) {
        this.http.get(url_list).toPromise().then((data_: any) => {
          console.log('user list: ', data_.data);
          this.data = data_.data;
        });
      }
    });

  }

  ngOnInit(): void {
    const url = '/rest/temperature/config/list';
    this.data = this.http.get(environment.endpoint + url).toPromise().then((data: any) => {
      console.log('user list: ', data.data);
      this.data = data.data;
    });
    const url_count = '/rest/temperature/config/list?countOnly=Y';
    this.http.get(environment.endpoint + url_count).toPromise().then((data: any) => {
      console.log('count: ', data);
      this.total = data.totalCount;
    });
  }
  getPreviousPage() {
    const url = '/rest/temperature/config/list?page=';
    if (this.count >= 1) {
      this.count--;
    }
    this.http.get(environment.endpoint + url + (this.count)).toPromise().then((data: any) => {
      this.data = data.data;
    });
  }
  getNextPage() {
    const url = '/rest/temperature/config/list?page=';
    this.count++;
    this.http.get(environment.endpoint + url + (this.count)).toPromise().then((data: any) => {
      if (data.data.length === 0) {
        this.count--;
      }
      this.data = data.data;
    });
  }
}
