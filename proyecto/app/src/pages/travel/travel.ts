import { ApiProvider } from './../../providers/api/api';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import leaflet from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation';


@Component({
  selector: 'page-travel',
  templateUrl: 'travel.html',
})
export class TravelPage {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  query: string = '';
  routes: any = [];
  defRoutes: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    private api: ApiProvider) {
    this.initializeRoutes();
  }

  ionViewWillEnter() {
    this.loadMap();
  }

  loadMap() {
    this.map = leaflet.map(this.mapContainer.nativeElement).setView([4.6243, -74.0636], 13);
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      maxZoom: 18,
      minZoom: 12
    }).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 15
    }).on('locationfound', (e) => {
      console.log('found you');
    })
  }

  private initializeRoutes() {
    this.api.getRoutes().subscribe(response => {
      if (response) {
        this.defRoutes = response.routes;
        console.log(response.routes);
      } else {
        console.log('something failed in init routes');
      }
    })
  }

  public searchRoute() {
    this.routes = this.defRoutes;
    console.log(this.query);
    if (this.query && this.query.trim() != '') {
      this.routes = this.routes.filter((route) => {
        return (route.code.toLowerCase().indexOf(this.query.toLowerCase()) > -1 ||
          route.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1);
      })
    }
  }

  public selectRoute(route) {
    console.log('ruta elegida ' + route);

    this.api.getRouteStops(route).subscribe(response => {
      if(response) {
        console.log(response.stops);
        leaflet.marker([4.635539, -74.115545]).addTo(this.map);
      }
    })

    this.routes = [];
  }
}
