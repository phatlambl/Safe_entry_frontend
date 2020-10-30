import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment.prod';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  pageIndex: any;
  count = 0;
  projectName = 'demo';
  total: any;
  constructor(private http: HttpClient) { }
  public data: Object = [];
  Total: any;
  PageCount: any;
  ngOnInit(): void {
    const url = '/rest/user/list';
    const url_count = '/rest/user/list?countOnly=Y';
    this.http.get(environment.endpoint + url).toPromise().then((data: any) => {
      console.log('user list: ', data);
      this.data = data.data;
    });
    this.http.get(environment.endpoint + url_count).toPromise().then((data: any) => {
      console.log('count: ', data);
      this.total = data.totalCount;
    });
    // const Observable = this.http.get(this.api.getListDeviceLogs, options);
  }

  getPreviousPage() {
    const url = '/rest/user/list?page=';
    if (this.count >= 1) {
      this.count--;
    }
    this.http.get(environment.endpoint + url + (this.count)).toPromise().then((data: any) => {
      this.data = data.data;
    });
  }

  getNextPage() {
    const url = '/rest/user/list?page=';
    this.count++;
    this.http.get(environment.endpoint + url + (this.count)).toPromise().then((data: any) => {
      console.log('next ', data.data);
      if (data.data.length === 0) {
        this.count--;
      }
      this.data = data.data;
    });
  }
}
