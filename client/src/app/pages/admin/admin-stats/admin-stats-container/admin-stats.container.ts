import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { filterSuccessResult } from '@ngneat/query';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { BehaviorSubject, map, take } from 'rxjs';
import { AdminService } from '../../../../_services/admin-service/admin.service';
import { AdminStatsCardComponent } from '../admin-stats-card/admin-stats-card.component';

@Component({
  standalone: true,
  imports: [
    AdminStatsCardComponent,
    CommonModule,
    NgChartsModule,
    MatCardModule,
  ],
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
        [count]="result.data.loanedBooksCount"
        [subText]="'book(s) loaned'"
      />
      <admin-stats-card
        [count]="result.data.userCount"
        [subText]="'total users'"
      />

      } }
    </section>
    <section class="graphs-container">
      <mat-card>
        <div class="by-genre-title">
          <h3>Books by genre</h3>
        </div>
        <mat-card-content>
          <section class="donut-graph">
            <canvas
              *ngIf="loaded"
              baseChart
              class="donut-chart"
              [data]="doughnutChartData"
              [type]="'doughnut'"
              [options]="doughnutChartOptions"
            >
            </canvas>
          </section>
        </mat-card-content>
      </mat-card>
      <mat-card>
        <div class="post-title">
          <h3>Posts and comments per user</h3>
        </div>
        <mat-card-content>
          <section class="donut-graph">
            <canvas
              *ngIf="loaded"
              baseChart
              class="chart"
              [data]="barChartData"
              [options]="barChartOptions"
              [plugins]="barChartPlugins"
              [type]="barChartType"
            >
            </canvas>
          </section>
        </mat-card-content>
      </mat-card>
      <mat-card>
        <div class="post-title">
          <h3>Users per city</h3>
        </div>
        <mat-card-content>
          <section class="donut-graph">
            <canvas
              *ngIf="loaded"
              baseChart
              class="polar-chart"
              [data]="polarAreaChartData"
              [legend]="polarAreaLegend"
              [type]="polarAreaChartType"
              [options]="polarAreaChartOptions"
            >
            </canvas>
          </section>
        </mat-card-content>
      </mat-card>
    </section>
  </section>`,
  styleUrls: ['./admin-stats.container.scss'],
})
export class AdminStatsContainer implements OnInit {
  loaded = false;

  private adminService = inject(AdminService);

  queryAdminStats = this.adminService.queryAdminStats();

  totalsByGenre$ = this.queryAdminStats.result$.pipe(
    filterSuccessResult(),
    map((res) => {
      return res.data.totalsByGenre;
    })
  );
  userPostData$ = this.queryAdminStats.result$.pipe(
    filterSuccessResult(),
    map((res) => {
      // console.log(res.data.userData.map((user) => user.user));

      return res.data.userData.map((user) => user.user);
    })
  );

  userPostPostData$ = this.queryAdminStats.result$.pipe(
    filterSuccessResult(),
    map((res) => {
      // console.log(res.data.userData.map((user) => user.user));

      return res.data.userData.map((user) => user.posts);
    })
  );

  userCommentPostData$ = this.queryAdminStats.result$.pipe(
    filterSuccessResult(),
    map((res) => {
      // console.log(res.data.userData.map((user) => user.user));

      return res.data.userData.map((user) => user.comments);
    })
  );

  cityData$ = this.queryAdminStats.result$.pipe(
    filterSuccessResult(),
    map((res) => {
      // console.log(res.data.userData.map((user) => user.user));
      // console.log(res.data.totalsByCity.map((city) => city.city));

      return res.data.totalsByCity.map((city) => city.city);
    })
  );

  cityCountData$ = this.queryAdminStats.result$.pipe(
    filterSuccessResult(),
    map((res) => {
      // console.log(res.data.userData.map((user) => user.user));
      // console.log(res.data.totalsByCity.map((city) => city.city));

      return res.data.totalsByCity.map((city) => city.count);
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

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
    layout: {
      // padding: {
      //   top: 20,
      // },
    },
    plugins: {
      // title: {
      //   display: true,
      //   position: 'top',
      //   text: 'Books by genre',
      // },
      legend: {
        labels: {
          padding: 20,
          color: 'grey',
        },
        position: 'left',
      },
    },
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

  users$ = new BehaviorSubject<string[]>([]);

  ngOnInit(): void {
    this.totalsByGenre$.pipe(take(1)).subscribe((res) => {
      this.doughnutChartData.datasets[0].data = res;
      this.loaded = true;
    });

    this.userPostData$.pipe(take(1)).subscribe((res) => {
      this.barChartData.labels = res;
    });

    this.userPostPostData$.pipe(take(1)).subscribe((res) => {
      this.barChartData.datasets[0].data = res;
    });

    this.userCommentPostData$.pipe(take(1)).subscribe((res) => {
      this.barChartData.datasets[1].data = res;
    });
    this.cityData$.pipe(take(1)).subscribe((res) => {
      this.polarAreaChartData.labels = res;
    });

    this.cityCountData$.pipe(take(1)).subscribe((res) => {
      this.polarAreaChartData.datasets[0].data = res;
    });
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    scales: {
      x: { min: 0, max: 5 },
      y: {},
    },
    indexAxis: 'y',
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'white',
        },
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        color: 'white',
      },
    },
  };

  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Posts' },
      { data: [], label: 'Comments' },
    ],
  };

  public polarAreaChartOptions: ChartConfiguration['options'] = {
    // scales: {
    //   ticks: {
    //     backgroundColor: 'green',
    //   },
    // },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'white',
        },
      },

      datalabels: {
        color: 'white',
        backgroundColor: 'white',
      },
    },
  };

  public polarAreaChartData: ChartData<'polarArea'> = {
    labels: [],

    datasets: [
      {
        data: [300, 500, 100, 40, 120],
        label: 'Series 1',
      },
    ],
  };
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';
}
