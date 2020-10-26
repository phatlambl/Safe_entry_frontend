
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Variable } from '@angular/compiler/src/render3/r3_ast';




@Injectable({
  providedIn: 'root'
})
export class ChartByUserService implements OnInit {

  // readonly api:any ={
  //   getListDeviceLogByUser: "/rest/device/list/user/temperature"
  // }
  
  constructor(private http:HttpClient) { }

  userId: any
  fromTimestamp: any
  toTimestamp: any  

  d: any
  


  readonly api:any ={
    getListDeviceLogByUser: "/rest/device/list/user/temperature?userId=39C3A781&fromTimestamp=1609989362478&toTimestamp=1614989362478"
  }

  
  

  getDeviceLogsByUser(){
   let getChart = "rest/device/list/user/temperature?" + this.userId + "&" + this.fromTimestamp + "&" + this.toTimestamp;
    return this.http.get(this.api.getChart).pipe(map(result => result));   
  }

  // getDeviceLogsByUser(){
  //   let getChart = "rest/device/list/user/temperature?" + this.userId + "&" + this.fromTimestamp + "&" + this.toTimestamp;
  //    return this.http.get(this.api.getListDeviceLogByUser).pipe(map(result => result));   
  //  }

  ngOnInit(): void {
    
  }
  

  


 
}
