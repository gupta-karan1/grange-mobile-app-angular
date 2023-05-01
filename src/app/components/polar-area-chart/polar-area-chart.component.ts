import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChartData, ChartType, ChartEvent, ChartConfiguration } from 'chart.js';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, NgChartsModule],
  selector: 'app-polar-area-chart',
  templateUrl: './polar-area-chart.component.html',
  styleUrls: ['./polar-area-chart.component.scss'],
})
export class PolarAreaChartComponent implements OnInit {
  // PolarArea
  public polarAreaChartLabels: string[] = [
    'Web Design',
    'App Dev',
    'UI Design',
    'Graphics',
    'Overall',
  ];
  public polarAreaChartData: ChartData<'polarArea'> = {
    labels: this.polarAreaChartLabels,
    datasets: [
      {
        data: [36, 55, 67, 86, (36 + 55 + 67 + 73) / 4],
        label: 'Current Sem',
      },
    ],
  };
  public polarAreaLegend = true;

  //position of legend
  public polarAreaChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  public polarAreaChartType: ChartType = 'polarArea';

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
