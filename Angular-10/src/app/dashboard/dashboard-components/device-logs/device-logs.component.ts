import { DeviceLogServiceService } from './device-log-service.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-device-logs',
  templateUrl: './device-logs.component.html',
  styleUrls: ['./device-logs.component.css']
})
export class DeviceLogsComponent implements OnInit {

  // public dsDeviceLogs:DeviceLogsComponent = new DeviceLogsComponent();

  public data= []
  private deviceLogs = new Subscription();  

  constructor(private svDeviceLogs: DeviceLogServiceService) { }

  ngOnInit(): void {

    this.deviceLogs = this.svDeviceLogs.getListDeviceLogs().subscribe((data)=>{
      console.log(data);
      this.data=data;
    })
  }

}
