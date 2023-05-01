import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NgChartsModule],
  selector: 'app-scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.scss'],
})
export class ScatterChartComponent implements OnInit {
  // scatter
  public scatterChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      },

      legend: {
        display: true,
        position: 'bottom',
      },
    },
  };
  public scatterChartLabels: string[] = [
    'Eating',
    'Drinking',
    'Sleeping',
    'Designing',
    'Coding',
    'Cycling',
    'Running',
  ];

  public scatterChartData: ChartData<'scatter'> = {
    labels: this.scatterChartLabels,
    datasets: [
      {
        data: [
          { x: 1, y: 1 },
          { x: 2, y: 3 },
          { x: 3, y: -2 },
          { x: 4, y: 4 },
          { x: 5, y: -3 },
        ],
        label: 'Series A',
        pointRadius: 10,
      },
    ],
  };
  public scatterChartType: ChartType = 'scatter';

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    // console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    // console.log(event, active);
  }
  constructor() {}

  ngOnInit() {}
}
