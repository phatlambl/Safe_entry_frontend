import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Chart} from 'chart.js';
import { map } from 'rxjs/operators';
import { environment } from './../../../../environments/environment.prod';


@Component({
  selector: 'app-chart-by-user',
  templateUrl: './chart-by-user.component.html',
  styleUrls: ['./chart-by-user.component.css']
})
export class ChartByUserComponent implements OnInit {

  chart: any = [];

  userId: any;
  name: any;
  public subParam: Subscription = new Subscription;
  fromTimestamp: any;
  toTimestamp: any;
  d: any;
  public data: Object = [];
  projectName = 'demo';


  constructor(private http: HttpClient,
              private activatedRouted: ActivatedRoute) { }

  private listDeviceLogByUser = new Subscription();

   // funtion select option
   selectedOption: any;
   printedOption: any;



  options = [
    { name: '1 week', value: 7 },
    { name: '1 month', value: 30 },
    { name: '6 month', value: 180 }
  ];
  getTime() {

  this.printedOption = this.selectedOption;

   if (this.selectedOption === '1 week') {
    this.getTimestampXDayAgo(7);
   }
   if (this.selectedOption === '1 month') {
    this.getTimestampXDayAgo(30);
   }
   if (this.selectedOption === '6 month') {
    this.getTimestampXDayAgo(180);
   }

   this.getChart();

  }

  // function get time x day from a current date
getTimestampXDayAgo(x: any) {
  const units = {
    year  : 24 * 60 * 60 * 1000 * 365,
    month : 24 * 60 * 60 * 1000 * 365 / 12,
    day   : 24 * 60 * 60 * 1000,
    hour  : 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000
  };
  const d = new Date();
  this.toTimestamp = d.getTime();
  d.setMilliseconds(d.getMilliseconds() - units.day * x);
  this.fromTimestamp = d.getTime();
  }


  getDeviceLogsByUser() {
    const getChart = '/rest/device/list/user/temperature?userId=' + this.userId + '&fromTimestamp=' + this.fromTimestamp + '&toTimestamp=' + this.toTimestamp;
   return this.http.get(environment.endpoint + getChart).pipe(map(result => result));
   }

   // get chart
   getChart() {
    this.getDeviceLogsByUser().subscribe((data) => {
      const result: any = data;

      let i;
      const temperature = [];
      const alldate: any = [];
      for (i = 0; i < result.length; i++) {
          temperature.push(result[i].temperature);
          alldate.push(result[i].timestamp);
      }


      const date: any = [];
      alldate.forEach((data: number) => {
      const jsdate = new Date(data);
      date.push(jsdate.toLocaleDateString('en', {year: 'numeric', month: 'short', day: 'numeric' } ));

      });
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: date,
          datasets: [
            {
              data: temperature,
              borderColor: '#3cba9f',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true

                // type: 'time',
                // position: 'bottom',
                // time: {
                //   displayFormats: {'day': 'MM/YY'},
                //   tooltipFormat: 'DD/MM/YY',
                //   unit: 'month',
                //  }

            }],
            yAxes: [{
              display: true
            }]
          }
        }
      });
    });
  }


  ngOnInit(): void {
    // auto 7 day when access
    this.subParam = this.activatedRouted.queryParamMap.subscribe((params) => {
      this.userId = params.get('userId');
      this.name = params.get('name');

    });
    this.getTimestampXDayAgo(7);
    this.printedOption = '1 week';



    // alert("UserId" + this.userId)
    // alert("from" + this.fromTimestamp)
    // alert("to" + this.toTimestamp)
    this.getChart();

  }




}
