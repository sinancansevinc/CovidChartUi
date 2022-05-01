import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ChartType } from 'angular-google-charts';
import { Country } from './Models/country';
import { CovidService } from './Services/covid.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  countryList:any=[];
  id!: number;
  isMain=true;
  constructor(public covidService:CovidService,private activatedRoute: ActivatedRoute,private route:Router){
    this.route.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (e.url.startsWith("/country")) {
          this.isMain=false;
        }
      }
    });
  }
  
  ngOnInit(): void {

    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'))!;
    this.covidService.getCountries().subscribe(countryList=>{
      this.countryList=countryList;
    })
 
  }

}
