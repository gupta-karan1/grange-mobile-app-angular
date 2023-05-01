import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { default as Annotation } from 'chartjs-plugin-annotation';
import { default as DataLabelsPlugin } from 'chartjs-plugin-datalabels';

@Component({
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, NgChartsModule],
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  //  <!-- GPA Performance over semesters in line chart. Score on y and sems on x axis. -->
  //  <!-- https://valor-software.com/ng2-charts/#/LineChart -->
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor() {}
  ngOnInit() {}

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [3.2, 2.5, 1.5, 2.8, 1.8, 3.8, 2.4],
        label: '2023',
        // backgroundColor: 'rgba(148,159,177,0.2)',
        // borderColor: 'rgba(148,159,177,1)',
        // pointBackgroundColor: 'rgba(148,159,177,1)',
        // pointBorderColor: '#fff',
        // pointHoverBackgroundColor: '#fff',
        // pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [1.5, 2.5, 1.2, 2.1, 3.1, 1.8, 2.3],
        label: '2022',
        // backgroundColor: 'rgba(77,83,96,0.2)',
        // borderColor: 'rgba(77,83,96,1)',
        // pointBackgroundColor: 'rgba(77,83,96,1)',
        // pointBorderColor: '#fff',
        // pointHoverBackgroundColor: '#fff',
        // pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
      // {
      //   data: [180, 480, 770, 90, 1000, 270, 400],
      //   label: 'Series C',
      //   // yAxisID: 'y1',
      //   backgroundColor: 'rgba(255,0,0,0.3)',
      //   borderColor: 'red',
      //   pointBackgroundColor: 'rgba(148,159,177,1)',
      //   pointBorderColor: '#fff',
      //   pointHverBackgroundColor: '#fff',
      //   pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      //   fill: 'origin',
      // },
    ],
    labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 8'],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
        beginAtZero: true,
        max: 4.0,
      },
      // y1: {
      //   position: 'right',
      //   grid: {
      //     color: 'rgba(255,0,0,0.3)',
      //   },
      //   ticks: {
      //     color: 'red',
      //   },
      // },
    },

    plugins: {
      legend: { display: true, position: 'bottom' },
      // annotation: {
      //   annotations: [
      //     {
      //       type: 'line',
      //       scaleID: 'x',
      //       value: 'Sem 4',
      //       borderColor: 'orange',
      //       borderWidth: 2,
      //       label: {
      //         display: true,
      //         position: 'center',
      //         color: 'orange',
      //         content: 'LineAnno',
      //         font: {
      //           weight: 'bold',
      //         },
      //       },
      //     },
      //   ],
      // },
    },
  };

  public lineChartType: ChartType = 'line';

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    // console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    // console.log(event, active);
  }
}
