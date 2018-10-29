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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation) {
  }

  ionViewWillEnter(){
   this.loadMap();
  }

  loadMap() {
    this.map = leaflet.map(this.mapContainer.nativeElement).setView([ 4.6243, -74.0636], 13);
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
}
