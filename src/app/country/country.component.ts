import { Component, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { GoogleChartsModule } from 'angular-google-charts';
import { CovidService } from 'src/app/Services/covid.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
})
export class CountryComponent implements OnInit {
  title = 'Covid 19 Chart';
  type = ChartType.LineChart;
  id!: number;

  constructor(
    public covidService: CovidService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'))!;
    console.log(this.id);
    this.covidService.startConnection(this.id);
    console.log('Connection made');
    this.covidService.startListener();
  }

  columnNames = ['Date', 'Case Counts'];
  deathColumnNames = ['Date', 'Death Counts'];

  options: any = { legend: { position: 'Bottom' } };
  deathOptions: any = { legend: { position: 'Bottom' }, colors: ['#FF0000'] };
}
