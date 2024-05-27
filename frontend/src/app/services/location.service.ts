import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import Geolocation from 'ol/Geolocation';
import { Coordinate } from 'ol/coordinate';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  getCurrentLocation(): Observable<Coordinate> {
    return new Observable((observer: Observer<Coordinate>) => {
      const geolocation = new Geolocation({
        trackingOptions: {
          enableHighAccuracy: true // Optional: enable high accuracy mode
        },
        projection: 'EPSG:27700' // Specify the desired projection (e.g., WGS84)
      });

      // Start tracking the user's position
      geolocation.setTracking(true);

      // When the position changes, emit the new coordinates
      geolocation.on('change', () => {
        const position = geolocation.getPosition();
        if (position) {
          observer.next(position);
        }
      });

      // Handle errors
      geolocation.on('error', (error) => {
        observer.error(error);
      });
      
    });
  }
}
