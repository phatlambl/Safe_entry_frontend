import {environment} from './../../../../environments/environment.prod';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {filter} from 'rxjs/operators';
import {Data} from '@angular/router';
import {DeviceLogServiceService} from './device-log-service.service';
import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-device-logs',
  templateUrl: './device-logs.component.html',
  styleUrls: ['./device-logs.component.css']
})
export class DeviceLogsComponent implements OnInit {

  // public dsDeviceLogs:DeviceLogsComponent = new DeviceLogsComponent();
  count = 0;
  total: any;
  public data: Object = [];
  private deviceLogs = new Subscription();
  pageIndex = 1;
  leftList: any;
  rightList: any;
  pageIndex1: any;
  filter = false;
  email: any;
  name: any;
  temperature: any;
  fromTimestamp: any;
  toTimestamp: any;
  url = '/rest/device/list/log?' + 'name=' + this.name + '&email=' + this.email + '&temperature=';
  fromDate: any;
  toDate: any;


  constructor(private svDeviceLogs: DeviceLogServiceService, private http: HttpClient) {
  }

  ngOnInit(): void {
    const url = '/rest/device/list/log';
    const url_count = '/rest/device/list/log?countOnly=Y';
    this.http.get(environment.endpoint + this.url).toPromise().then((data: any) => {
      console.log('user list: ', data);
      this.data = data.data;
    });
    this.http.get(environment.endpoint + url_count).toPromise().then((data: any) => {
      console.log('user list: ', data);
      this.total = data.totalCount;
    });
  }

  showHideFilter() {
    if (this.filter) {
      this.filter = false;
    } else {
      this.filter = true;
    }

  }

  convertTimeToDate(response: any) {

    const myArray: any = [];
    response.forEach((data: any) => {

      console.log('userId' + data.userId);
      const temp = {} as temp;
      temp.userId = data.userId;
      temp.name = data.name;
      temp.temperature = data.temperature;
      temp.deviceId = data.deviceId;
      temp.location = data.location;
      const jsdate = new Date(data.timestamp);
      temp.date = jsdate.toLocaleDateString();
      temp.time = jsdate.toLocaleTimeString();

      console.log(temp);
      myArray.push(temp);
    });

    this.data = myArray;
  }

  getPreviousPage() {
    const url = '/rest/device/list/log?pageIndex=';
    if (this.count >= 1) {
      this.count--;
    }
    this.http.get(environment.endpoint + url + (this.count)).toPromise().then((data: any) => {
      this.data = data.data;
    });

  }

  getNextPage() {
    const url = '/rest/device/list/log?pageIndex=';
    this.count++;
    this.http.get(environment.endpoint + url + (this.count)).toPromise().then((data: any) => {
      this.data = data.data;
      if (data.data.length === 0) {
        this.count--;
      }
    });
  }

  search() {
    // tslint:disable-next-line:max-line-length
    if (this.temperature === undefined || this.temperature === null) {
      this.temperature = 0;
    }
    if (this.fromDate !== undefined) {
      this.fromTimestamp = new Date(this.fromDate).getTime();
    }
    if (this.fromDate === undefined) {
      this.fromTimestamp = 0;
    }
    if (this.toDate !== undefined) {
      this.toTimestamp = new Date(this.toDate).getTime();
    }
    if (this.toDate === undefined) {
      this.toTimestamp = 0;
    }
    const url = '/rest/device/list/log?' + 'name=' + this.name + '&email=' + this.email + '&temperature=' + this.temperature + '&filterOnly=Y' + '&fromTimestamp=' +
      this.fromTimestamp + '&toTimestamp=' + this.toTimestamp;
    this.http.get(environment.endpoint + url).toPromise().then((data: any) => {
      console.log('user list: ', data);
      console.log('url:', url);
      this.data = data.data;
    });
    const url_count = '/rest/device/list/log?' + 'name=' + this.name + '&email=' + this.email + '&temperature=' + this.temperature + '&filterOnly=Y' + '&fromTimestamp=' +
      this.fromTimestamp + '&toTimestamp=' + this.toTimestamp + '&countOnly=Y';
    this.http.get(environment.endpoint + url_count).toPromise().then((data: any) => {
      console.log('user list: ', data);
      this.total = data.totalCount;
    });
  }
}


