import { Component, OnInit, Inject, PLATFORM_ID, ElementRef, ViewChild, Input, OnChanges } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { useGeographic } from 'ol/proj'; // Import useGeographic from ol/proj
import { Coordinate } from 'ol/coordinate';
import { LocationService } from '../../../services/location.service';
import Icon from 'ol/style/Icon.js';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import Style from 'ol/style/Style';
import { Order } from '../../../shared/models/Order';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnChanges, OnInit {
  @Input()
  order!:Order; 
  
  @Input()
  readonly = false; 

  @ViewChild('mapElement', { static: true })
   mapElement!: ElementRef; // Reference to the map div element


  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKER_ICON = new Icon({
    src: '/src/assets/marker_kbua9q.png',
   // size: [42,42],
    // anchor: [21, 42]
  });

  private readonly DEFAULT_LATLNG: Coordinate = [28.9, 41.0];
  currentLatLng!: Coordinate;

  // view= new View({
  //   center: this.currentLatLng,
  //   zoom: this.MARKER_ZOOM_LEVEL
  // })

  map!: Map;

  // Create a vector layer for markers
  markerLayer = new VectorLayer({
    source: new VectorSource() // Create an empty vector source
  });

  //for allowing the ability of changing the pointer
  private isClickEnabled = true;


  constructor(@Inject(PLATFORM_ID) private platformId: Object, private locationService:LocationService) { }


  ngOnInit():void {
    if (isPlatformBrowser(this.platformId)) {
      this.initMap();
    }
  }

  ngOnChanges(): void {
    if(!this.order) return;


    if(this.readonly && this.addressLatLng){
      this.showLocationOnReadonlyMode();
    }
  }


  showLocationOnReadonlyMode() {
    const m = this.map;

    //this will set the address for the Marker
    this.setMarker(this.addressLatLng);

    //setting the map view
    m.setView(new View({
      center: this.addressLatLng,
      zoom: this.MARKER_ZOOM_LEVEL
    }));

    this.isClickEnabled = false;

  }

  

  private initMap(): void {
    useGeographic();

    this.map = new Map({
      target: this.mapElement.nativeElement, // Set the target to the map div element
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        this.markerLayer
      ],
      view: new View({
        center: this.DEFAULT_LATLNG,
        zoom: 10
      }),
    });

    // Remove the attribution logo from the map
    const attributionElement = this.map.getTargetElement().querySelector('.ol-attribution');
    if (attributionElement) {
      attributionElement.remove();
    }
  }


  findMyLocation(){
    this.locationService.getCurrentLocation().subscribe({

      
      next: (latlng:Coordinate) => {

        this.map.setView(new View({
          center: latlng,
          zoom: this.MARKER_ZOOM_LEVEL
        }));

        this.setMarker(latlng);
      },
      error: (error) => {
        console.error('Error getting current location:', error);
      }
    });
  }

  onClick(){
    if(!this.isClickEnabled) return;
    
    this.map.on('click', (e) => {
      this.setMarker(e.coordinate);
      console.log(e);
      return e.coordinate;
    });
  }

  setMarker(latlng: Coordinate) {
    this.addressCoordinate = latlng;
  
    // Create the marker style
    const markerStyle = new Style({
      image: this.MARKER_ICON
    }); 
  
    // Create the marker feature with the specified style
    const markerFeature = new Feature({
      geometry: new Point(latlng),
      style: markerStyle // Apply the marker style to the feature
    });
  
    // Access markerSource using optional chaining operator
    const markerSource = this.markerLayer.getSource();
  
    // Check if markerSource is not null or undefined before proceeding
    if (markerSource) {
      markerSource.clear(); // Clear existing markers
      markerSource.addFeature(markerFeature); // Add the new marker feature
    } else {
      console.error('Marker source is not initialized.');
    }
  }
  
  

  // the mongoDB don't accept a float number above 8 point after the digit so we have to cast it 
  set addressCoordinate(latlng:Coordinate){
    latlng[0] = parseFloat(latlng[0].toFixed(8));
    latlng[1] = parseFloat(latlng[1].toFixed(8));
    console.log(latlng)
    this.order.addressLatLng = latlng;
  }

  get addressLatLng(){
    return this.order.addressLatLng!;
  }
}
