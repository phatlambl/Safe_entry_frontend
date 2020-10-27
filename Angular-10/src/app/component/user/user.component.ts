import { Component, OnInit } from '@angular/core';
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

  constructor(private http: HttpClient) { }
  public data: Object = [];
  ngOnInit(): void {
    const url = '/rest/user/list';
    this.data = this.http.get(url).toPromise().then((data: any) => {
      console.log('user list: ', data);
      this.data = data;
    });
    // const Observable = this.http.get(this.api.getListDeviceLogs, options);
  }

  getPreviousPage() {
    const url = '/rest/user/list?page=';
    if (this.count >= 1) {
      this.count--;
    }
    this.http.get(url + (this.count)).toPromise().then((data: any) => {
      this.data = data;
    });
  }

  getNextPage() {
    const url = '/rest/user/list?page=';
    this.count++;
    this.http.get(url + (this.count)).toPromise().then((data: any) => {
      if (data.length === 0) {
        this.count--;
      }
      this.data = data;
    });
  }
}
