import { Component } from '@angular/core';
import { Card, features } from '../../../../data';

@Component({
  selector: 'app-feature-section',
  templateUrl: './feature-section.component.html',
  styleUrl: './feature-section.component.css'
})
export class FeatureSectionComponent {
  features:Card[] = features;

  constructor(){}

  ngOnInit():void{}

}
