import { Component, OnInit } from '@angular/core';
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

  constructor(private http: HttpClient) { }
  public data: Object = [];
  ngOnInit(): void {
    const url = '/rest/device/list';
    this.data = this.http.get(url).toPromise().then((data: any) => {
      console.log('user list: ', data.content);
      this.data = data.content;
    });
    // const Observable = this.http.get(this.api.getListDeviceLogs, options);
  }

  getPreviousPage() {
    const url = '/rest/device/list?page=';
    if (this.count >= 1) {
      this.count--;
    }
    this.http.get(url + (this.count)).toPromise().then((data: any) => {
      this.data = data.content;
    });
  }

  getNextPage() {
    const url = '/rest/device/list?page=';
    this.count++;
    this.http.get(url + (this.count)).toPromise().then((data: any) => {
      if (data.content.length === 0) {
        this.count--;
      }
      this.data = data.content;
    });
  }
}
