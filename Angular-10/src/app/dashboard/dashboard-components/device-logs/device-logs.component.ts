import { environment } from './../../../../environments/environment.prod';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs/operators';
import { Data } from '@angular/router';
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
  filter: boolean=false;

  

  constructor(private svDeviceLogs: DeviceLogServiceService, private http: HttpClient) {
  }

  ngOnInit(): void {
    const url = '/rest/device/list/log';

    const Observable = this.http.get(environment.endpoint + url).subscribe((response) => {
      console.log(response);
      this.convertTimeToDate(response)
    });
    
  }
  showHideFilter(){
    if(this.filter){
      this.filter=false
    }else{
      this.filter=true
    }
    
  }

  convertTimeToDate(response: any){
    
    let myArray: any =[];      
      response.forEach((data: any)=>{ 

        console.log("userId" + data.userId)
        let temp = {} as temp
        temp.userId = data.userId;
        temp.name = data.name;
        temp.temperature = data.temperature;
        temp.deviceId = data.deviceId;
        temp.location = data.location;
        let jsdate = new Date(data.timestamp)
        temp.date = jsdate.toLocaleDateString()
        temp.time = jsdate.toLocaleTimeString()    
      
        console.log(temp);    
        myArray.push(temp)
      })

      this.data = myArray;     
  }

  getPreviousPage() {
    const url = '/rest/device/list/log?page=';
    if (this.count > 1) {
      this.count--;
    }
    const Observable = this.http.get(environment.endpoint + url + (this.count)).subscribe((response) => {
      console.log(response);
      this.convertTimeToDate(response)
    });
    
  }

  getNextPage() {
    const url = '/rest/device/list/log?page=';
    this.count++;
    const Observable = this.http.get(environment.endpoint + url + (this.count)).subscribe((response) => {
      this.convertTimeToDate(response)
    });   
  }  

}

export interface temp {
  userId: any,
  name: any,
  temperature: any,
  deviceId: any,
  location: any,
  date: any,
  time: any
}
