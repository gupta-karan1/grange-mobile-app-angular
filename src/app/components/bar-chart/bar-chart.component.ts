import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChartConfiguration, ChartType, ChartData, ChartEvent } from 'chart.js';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, NgChartsModule],
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,

        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      datalabels: {
        // anchor: 'end',
        // align: 'end',
        display: false,
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];

  public barChartData: ChartData<'bar'> = {
    labels: ['Web Design', 'App Dev', 'UI Design', 'Graphics', 'Overall'],
    datasets: [
      { data: [65, 59, 80, 81, (65 + 59 + 80 + 81) / 4], label: 'Last Sem' },
      { data: [28, 48, 40, 19, (28 + 48 + 40 + 19) / 4], label: 'Current Sem' },
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
  constructor() {}

  ngOnInit() {}
}
