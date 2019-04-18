import {Component, OnInit} from '@angular/core';


import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  Marker,
  ILatLng,
  GoogleMapsMapTypeId
} from '@ionic-native/google-maps';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  map: GoogleMap;

  current_pos = {
    lat: 39.9566,
    lng: -75.1899
  };


  constructor() { }

  ngOnInit(): void {
    this.loadMap();
  }


  loadMap() {
    const mapOptions: GoogleMapOptions = {
      mapType: GoogleMapsMapTypeId.NORMAL,
      gestures: {
        scroll: true,
        tilt: true,
        zoom: true,
        rotate: true
      },
      preferences: {
        building: true
      }
    };


    /* if this map is load faster than DOM then call this method again */
    try {
      this.map = GoogleMaps.create('map_canvas', mapOptions);


      /* create camera positions */
      const cameraPosition: CameraPosition<ILatLng> = {
        target: {
          lat: this.current_pos.lat,
          lng: this.current_pos.lng
        },
        zoom: 20,
        tilt: 30
      };

      /* move the map to camera positions */
      this.map.moveCamera(cameraPosition).then(() => {

        /* create a marker to the coordinates */
        const marker: Marker = this.map.addMarkerSync({
          title: 'Drexel',
          icon: 'red',
          animation: 'DROP',
          position: {
            lat: this.current_pos.lat,
            lng: this.current_pos.lng
          }
        });

        /* if the user click on the marker */
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          console.log('Marker Click');
        });
      });


    } catch (err) {
      console.log('Cannot find map canvas. Calling loadMap again');
      this.loadMap();
      return;
    }

  }


  /**
   * This function to set the map center back to the specified
   * latitude and longitude
   *
   */
  relocatePosition() {
    const cameraPosition: CameraPosition<ILatLng> = {
      target: {
        lat: this.current_pos.lat,
        lng: this.current_pos.lng
      },
      zoom: 20,
      tilt: 30,
      duration: 2000
    };

    this.map.moveCamera(cameraPosition).then();
  }

}
