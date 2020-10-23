
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

  chart = []
  
  private listDeviceLogByUser = new Subscription();  


  constructor(private deviceLogByUser: ChartByUserService) { }

  ngOnInit(): void { 
     this.deviceLogByUser.getDeviceLogsByUser().subscribe((data)=>{
      console.log('data' ,data)            

      
  
      
      var i;
      let temperature = [];
      let alldate =[]; 
      for (i = 0; i < data.length; i++) {
          console.log(data[i].temperature)
          temperature.push(data[i].temperature);
          alldate.push(data[i].timestamp);
      }

           

     
      
      // let temperature = map(data =>data[0].temperature)
      // console.log("test" , temperature)

      // let alldate = data.pipe(map(data => data.timestamp))

      
      let date = [] 
      alldate.forEach((data: number)=>{
        let jsdate = new Date(data*1000)
        date.push(jsdate.toLocaleDateString('en', {year:'numeric',month:'short', day: 'numeric' }))
       
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

  // ngOnInit(): void {

  //   this.deviceLogs = this.svDeviceLogs.getListDeviceLogs().subscribe((data)=>{
  //     console.log(data);
  //     this.data=data;
  //   })
  // }

  

}
