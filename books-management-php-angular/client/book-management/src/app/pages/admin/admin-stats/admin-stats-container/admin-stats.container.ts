import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { filterSuccessResult } from '@ngneat/query';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { map, take } from 'rxjs';
import { AdminService } from '../../../../_services/admin-service/admin.service';
import { AdminStatsCardComponent } from '../admin-stats-card/admin-stats-card.component';
@Component({
  standalone: true,
  imports: [AdminStatsCardComponent, CommonModule, NgChartsModule],
  selector: 'admin-stats-container',
  template: ` <section class="stats-container">
    <section class="cards-container">
      @if (queryAdminStats.result$ | async; as result) { @if (result.isSuccess)
      {
      <admin-stats-card
        [count]="result.data.bookCount"
        [subText]="'total books'"
      />
      <admin-stats-card
        [count]="result.data.userCount"
        [subText]="'total users'"
      />
      <admin-stats-card
        [count]="result.data.booksLoanedOutCount"
        [subText]="'book(s) loaned'"
      />
      } }
    </section>

    <section class="donut-graph">
      <canvas
        *ngIf="loaded"
        baseChart
        class="chart"
        [data]="doughnutChartData"
        [type]="doughnutChartType"
      >
      </canvas>
    </section>
  </section>`,
  styleUrls: ['./admin-stats.container.scss'],
})
export class AdminStatsContainer implements OnInit {
  loaded = false;

  private adminService = inject(AdminService);

  queryAdminStats = this.adminService.queryAdminStats();

  adminStats$ = this.queryAdminStats.result$.pipe(
    filterSuccessResult(),
    map((res) => {
      return res.data.countArray;
    })
  );

  public doughnutChartLabels: string[] = [
    'Action',
    'Adventure',
    'Comedy',
    'Crime',
    'Drama',
    'Fantasy',
    'History',
    'Horror',
    'Mystery',
    'Non Fiction',
    'Thriller',
  ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: [] }],
  };

  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  ngOnInit(): void {
    this.adminStats$.pipe(take(1)).subscribe((res) => {
      this.doughnutChartData.datasets[0].data = res;
      this.loaded = true;
    });
  }
}
