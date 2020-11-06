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
  pageIndex: any;
  count = 0;
  public data: Object = [];
  projectName = "demo";

  constructor(private http: HttpClient) {
  }

  postData() {
    const url = '/rest/temperature/config';
    const url_list = '/rest/temperature/config/list';
    this.http.post(this.projectName + url, {emails: this.emails, temperature: this.temperature}).toPromise().then((data: any) => {
      console.log('post status: ', data);
      if (data.statusCode === 200) {
        this.http.get(url_list).toPromise().then((data_: any) => {
          console.log('user list: ', data_.content);
          this.data = data_.content;
        });
      }
    });
  }

  ngOnInit(): void {
    const url = '/rest/temperature/config/list';
    this.data = this.http.get(this.projectName + url).toPromise().then((data: any) => {
      console.log('user list: ', data.content);
      this.data = data.content;
    });
  }

  getPreviousPage() {
    const url = '/rest/temperature/config/list?page=';
    if (this.count >= 1) {
      this.count--;
    }
    this.http.get(this.projectName + url + (this.count)).toPromise().then((data: any) => {
      this.data = data.content;
    });
  }

  getNextPage() {
    const url = '/rest/temperature/config/list?page=';
    this.count++;
    this.http.get(this.projectName + url + (this.count)).toPromise().then((data: any) => {
      if (data.content.length === 0) {
        this.count--;
      }
      this.data = data.content;
    });
  }
}
