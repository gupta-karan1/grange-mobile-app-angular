import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgChartsModule } from 'ng2-charts';
import { DynamicChartComponent } from 'src/app/components/dynamic-chart/dynamic-chart.component';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { RadarChartComponent } from 'src/app/components/radar-chart/radar-chart.component';
import { PieChartComponent } from 'src/app/components/pie-chart/pie-chart.component';
import { PolarAreaChartComponent } from 'src/app/components/polar-area-chart/polar-area-chart.component';
import { BarChartComponent } from 'src/app/components/bar-chart/bar-chart.component';
import { LineChartComponent } from 'src/app/components/line-chart/line-chart.component';
import { ScatterChartComponent } from 'src/app/components/scatter-chart/scatter-chart.component';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.page.html',
  styleUrls: ['./analytics.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NgChartsModule,
    DynamicChartComponent,
    RadarChartComponent,
    PieChartComponent,
    PolarAreaChartComponent,
    BarChartComponent,
    LineChartComponent,
    ScatterChartComponent,
  ],
})
export class AnalyticsPage implements OnInit {
  //https://valor-software.com/ng2-charts/#GeneralInfo reference for charts
  // npm packagehttps://www.npmjs.com/package/ng2-charts
  // npm install --save ng2-charts
  //npm install --save chart.js

  ngOnInit() {}
  constructor() {}
}
