import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Country } from '../Models/country';
import { Covid } from '../Models/covid';

@Injectable({
  providedIn: 'root',
})
export class CovidService {
  public covidChartList = new Array();
  public covidDeathChartList=new Array();
  private hubConnection!: signalR.HubConnection;
  li: any;
  countryList!: Country[];

  constructor(private http: HttpClient) {}

  private startInvoke(id: number) {
    console.log("StartInvoke...");
    this.hubConnection.invoke('GetStartCovidList', id).catch((err) => {
      console.log(err);
    });
    this.hubConnection.invoke('GetCovidDeathCountList', id).catch((err) => {
      console.log(err);
    });
  }

  startConnection(id: number) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7135/covid')
      .build();

    this.hubConnection
      .start()
      .then(() => {
        this.startInvoke(id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  startListener() {
    this.hubConnection.on('ReceiveStartCovid', (covidCharts: Covid[]) => {
      this.covidChartList = [];
      covidCharts.forEach((item) => {
        console.log(item);
        this.covidChartList.push([item.covidDate, item.count[0]]);
      });
    });

    this.hubConnection.on('ReceiveDeathCovid', (covidCharts: Covid[]) => {
      this.covidDeathChartList = [];
      covidCharts.forEach((item) => {
        console.log(item);
        this.covidDeathChartList.push([item.covidDate, item.count[0]]);
      });
    });


  }

  getCountries() {
    return this.http.get('https://localhost:7135/api/Covids/GetCountries');
  }
}
