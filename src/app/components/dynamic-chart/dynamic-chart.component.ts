import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NgChartsModule],
  selector: 'app-dynamic-chart',
  templateUrl: './dynamic-chart.component.html',
  styleUrls: ['./dynamic-chart.component.scss'],
})
export class DynamicChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined; // this is the #chart reference in the html file for the chart component

  public barChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.4,
      },
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
        max: 100,
        // suggestedMax: 100,
        beginAtZero: true,

        ticks: {
          stepSize: 5,
        },
      },
    },
    plugins: {
      legend: { display: true, position: 'bottom' },
    },
  };
  public barChartLabels: string[] = [
    'Week 1',
    'Week 2',
    'Week 3',
    'Week 4',
    'Week 5',
  ];
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      { data: [65, 59, 80, 81, 56], label: 'Web Design' },
      { data: [28, 48, 40, 19, 86], label: 'App Dev' },
      { data: [35, 67, 89, 15, 20], label: 'UI Design' },
      { data: [15, 95, 45, 63, 32], label: 'Graphics' },
    ],
  };

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

  public async randomize(): Promise<void> {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }

  constructor() {}

  ngOnInit() {
    this.randomize();
  }
}
