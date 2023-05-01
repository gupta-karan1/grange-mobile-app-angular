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
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        suggestedMax: 50,
        suggestedMin: 0,
      },

      y: {
        min: 0,
        max: 4,
        suggestedMax: 4,
      },
    },
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
  // public scatterChartLabels: string[] = [
  //   'App Dev',
  //   'Web Design',
  //   'UI Design',
  //   'Graphics',
  //   'Overall',
  // ];

  public scatterChartData: ChartData<'scatter'> = {
    // labels: this.scatterChartLabels,
    datasets: [
      {
        data: [
          { x: 10, y: 1.2 },
          { x: 25, y: 2.1 },
          { x: 35, y: 2.8 },
          { x: 15, y: 1.8 },
          { x: 45, y: 3.2 },
          { x: 5, y: 1.0 },
          { x: 30, y: 2.7 },
          { x: 20, y: 2.2 },
        ],
        label: 'Current Sem',
        pointRadius: 5,
      },
      {
        data: [
          { x: 25, y: 2.5 },
          { x: 35, y: 3.0 },
          { x: 10, y: 2.1 },
          { x: 40, y: 3.5 },
          { x: 15, y: 1.5 },
          { x: 3, y: 0.6 },
          { x: 20, y: 1.8 },
          { x: 45, y: 3.7 },
        ],
        label: 'Last Sem',
        pointRadius: 5,
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
