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
    // ChartConfiguration is a type from chart.js
    responsive: true, // make the chart responsive
    scales: {
      // define the scales of the chart
      x: {
        type: 'linear', // define the type of scale for the x-axis
        position: 'bottom', // define the position of the x-axis
        suggestedMax: 50, // define the maximum value of the x-axis
        suggestedMin: 0, // define the minimum value of the x-axis
      },

      y: {
        // define the y-axis
        min: 0, // define the minimum value of the y-axis
        max: 4, // define the maximum value of the y-axis
        suggestedMax: 4, // define the suggested maximum value of the y-axis
      },
    },
    plugins: {
      // define the plugins of the chart
      datalabels: {
        // define the datalabels plugin
        anchor: 'end', // define the anchor of the datalabels
        align: 'end', // define the alignment of the datalabels
      },

      legend: {
        // define the legend of the chart
        display: true, // display the legend
        position: 'bottom', // define the position of the legend
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
    // define the data of the chart (the data is an array of objects)
    // labels: this.scatterChartLabels,
    datasets: [
      // define the datasets of the chart
      {
        data: [
          // define the data of the first dataset
          { x: 10, y: 1.2 }, // define the data points of the first dataset
          { x: 25, y: 2.1 },
          { x: 35, y: 2.8 },
          { x: 15, y: 1.8 },
          { x: 45, y: 3.2 },
          { x: 5, y: 1.0 },
          { x: 30, y: 2.7 },
          { x: 20, y: 2.2 },
        ],
        label: 'Current Sem', // define the label of the first dataset
        pointRadius: 5, // define the radius of the points of the first dataset
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
  public scatterChartType: ChartType = 'scatter'; // define the type of the chart (scatter)

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
