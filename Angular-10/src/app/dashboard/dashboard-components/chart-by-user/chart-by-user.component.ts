import { ActivatedRoute } from '@angular/router';
import { ChartByUserService } from './chart-by-user.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Chart} from 'chart.js'
import { map } from "rxjs/operators";


@Component({
  selector: 'app-chart-by-user',
  templateUrl: './chart-by-user.component.html',
  styleUrls: ['./chart-by-user.component.css']
})
export class ChartByUserComponent implements OnInit {

  chart: any= [];  

  userId: any
  private subParam: Subscription;
  fromTimestamp: any
  toTimestamp: any 
  d: any  
  public data: Object = [];


  constructor(private deviceLogByUser: ChartByUserService, private http: HttpClient,
              private activatedRouted:ActivatedRoute) { }
  
  private listDeviceLogByUser = new Subscription(); 
  
   // funtion select option
   selectedOption: any
   printedOption: any


  options = [
    { name: "1 week", value: 7 },
    { name: "1 month", value: 30 },
    { name: "6 month", value: 30*6 }
  ]
  getTime() {    
    
   if(this.selectedOption === "1 week")
   {
    this.getTimestampXDayAgo(7)    
   }
   if(this.selectedOption === "1 month")
   {
    this.getTimestampXDayAgo(30)  
   }
   if(this.selectedOption === "6 week")
   {
    this.getTimestampXDayAgo(30*6)
   }     
   this.getChart() 
  }
  
  //function get time x day from a current date
getTimestampXDayAgo(x: any){
  var units = {
    year  : 24 * 60 * 60 * 1000 * 365,
    month : 24 * 60 * 60 * 1000 * 365/12,
    day   : 24 * 60 * 60 * 1000,
    hour  : 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000
  }
  var d = new Date();  
  this.toTimestamp=d.getTime();
  d.setMilliseconds(d.getMilliseconds()-units.day*x)
  this.fromTimestamp = d.getTime();     
  }


  getDeviceLogsByUser(){
    let getChart = "rest/device/list/user/temperature?" + this.userId + "&" + this.fromTimestamp + "&" + this.toTimestamp;
   return this.http.get(getChart).pipe(map(result => result));   
   }

   //get chart
   getChart(){    
    this.getDeviceLogsByUser().subscribe((data)=>{
      console.log('data' ,data)          
      let result: any=data;

      var i;
      let temperature = [];
      let alldate: any =[]; 
      for (i = 0; i < result.length; i++) {
          console.log(result[i].temperature)
          temperature.push(result[i].temperature);
          alldate.push(result[i].timestamp);
      }
        
      
      let date: any [] 
      alldate.forEach((data: number)=>{
      let jsdate = new Date(data*1000)
      date.push(jsdate.toLocaleDateString('en', {month:'short' }))
       
      })
      this.chart = new Chart('canvas',{
        type: 'line',
        data:{
          labels: date,
          datasets:[
            {
              data: temperature,
              borderColor:"#3cba9f",
              fill: false
            }
          ]
        },
        options:{
          legend:{
            display: false
          },
          scales: {
            xAxes:[{
              display: true
            }],
            yAxes:[{
              display: true
            }]
          }
        }        
      })      
    })   
  }


  ngOnInit(): void { 
    //auto 7 day when access
    this.subParam = this.activatedRouted.params.subscribe((params) =>{
      this.userId = params.userId;
    })
    this.getTimestampXDayAgo(7)

    alert("UserId" + this.userId)
    alert("from" + this.fromTimestamp)
    alert("to" + this.toTimestamp)
    this.getChart()
     
  }

  // ngOnInit(): void {

  //   this.deviceLogs = this.svDeviceLogs.getListDeviceLogs().subscribe((data)=>{
  //     console.log(data);
  //     this.data=data;
  //   })
  // }

  

}
