import { ApiProvider } from './../../providers/api/api';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import leaflet from 'leaflet';
import 'leaflet-routing-machine';
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
    private api: ApiProvider,
    public loadingCtrl: LoadingController) {
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
    })
  }

  private initializeRoutes() {
    this.api.getRoutes().subscribe(response => {
      if (response) {
        this.defRoutes = response.routes;
      } else {
        console.log('something failed in init routes');
      }
    })
  }

  public searchRoute() {
    this.routes = this.defRoutes;
    if (this.query && this.query.trim() != '') {
      this.routes = this.routes.filter((route) => {
        return (route.code.toLowerCase().indexOf(this.query.toLowerCase()) > -1 ||
          route.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1);
      })
    }
  }

  public selectRoute(route) {

    this.query = `${route.code} ${route.name} - Destino: ${route.destination}`;

    const loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    loading.present();

    let waypoints = [];
    this.api.getRouteStops(route).subscribe(response => {
      if (response) {
        response.stops.forEach((stop) => {
          waypoints.push([stop.latitude, stop.longitude]);
          leaflet.marker([stop.latitude, stop.longitude]);
        });

        let control = leaflet.Routing.control({
          waypoints: waypoints
        }).addTo(this.map);

        control.hide();
        loading.dismiss();
        this.map.fitBounds(waypoints);
      }
    })

    this.routes = [];
  }
}
