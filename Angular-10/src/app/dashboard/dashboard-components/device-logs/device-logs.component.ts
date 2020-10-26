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
  public data: Object = [];
  private deviceLogs = new Subscription();
  pageIndex = 1;
  leftList: any;
  rightList: any;
  pageIndex1: any;

  constructor(private svDeviceLogs: DeviceLogServiceService, private http: HttpClient) {
  }

  ngOnInit(): void {

    this.deviceLogs = this.svDeviceLogs.getListDeviceLogs().subscribe((data) => {
      console.log(data);
      this.data = data;
    });
  }

  getPreviousPage() {
    const url = '/rest/device/list?page=';
    if (this.count > 1) {
      this.count--;
    }
    const Observable = this.http.get(url + (this.count)).subscribe((response) => {
      console.log(response);
      this.data = response;
    });
  }

  getNextPage() {
    const url = '/rest/device/list?page=';
    this.count++;
    const Observable = this.http.get(url + (this.count)).subscribe((response) => {
      console.log(response);
      this.data = response;
    });
  }

}
