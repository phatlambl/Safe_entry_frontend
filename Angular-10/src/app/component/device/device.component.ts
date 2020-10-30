import {Component, OnInit} from '@angular/core';
import {environment} from './../../../environments/environment.prod';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  pageIndex: any;
  count = 0;
  total: any;
  projectName = 'demo';

  constructor(private http: HttpClient) {
  }

  public data: Object = [];

  ngOnInit(): void {
    const url = '/rest/device/list';
    const url_count = '/rest/device/list?countOnly=Y';
    this.http.get(environment.endpoint + url).toPromise().then((data: any) => {
      console.log('user list: ', data.content);
      this.data = data.data;
    });
    this.http.get(environment.endpoint + url_count).toPromise().then((data: any) => {
      console.log('count: ', data);
      this.total = data.totalCount;
    });
    // const Observable = this.http.get(this.api.getListDeviceLogs, options);
  }

  getPreviousPage() {
    const url = '/rest/device/list?page=';
    if (this.count >= 1) {
      this.count--;
    }
    this.http.get(environment.endpoint + url + (this.count)).toPromise().then((data: any) => {
      this.data = data.data;
    });
  }

  getNextPage() {
    const url = '/rest/device/list?page=';
    this.count++;
    this.http.get(environment.endpoint + url + (this.count)).toPromise().then((data: any) => {
      if (data.data.length === 0) {
        this.count--;
      }
      this.data = data.data;
    });
  }
}
