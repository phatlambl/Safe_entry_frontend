import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ChartByUserService {

  readonly api:any ={
    getListDeviceLogByUser: "/rest/device/list/user/temperature?userId=39C3A781&fromTimestamp=1609989362478&toTimestamp=1614989362478"
  }
  constructor(private http:HttpClient) { }


  getDeviceLogsByUser(){
    return this.http.get(this.api.getListDeviceLogByUser).pipe(map(result => result));   
  }



  // getListDeviceLogs(): Observable<any> {
  //   let Observable = this.http.get(this.api.getListDeviceLogs) 
  //     return Observable;
  // }
}
