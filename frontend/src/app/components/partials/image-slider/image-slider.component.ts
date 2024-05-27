import { Component, OnInit, OnDestroy, Renderer2, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit, AfterViewInit, OnDestroy {
  private linkElement?: HTMLLinkElement;

  @ViewChild('carousel', { static: true }) carousel!: ElementRef;
  @ViewChild('leftArrow', { static: true }) leftArrow!: ElementRef;
  @ViewChild('rightArrow', { static: true }) rightArrow!: ElementRef;
  isBrowser: boolean;
  isDragStart = false;
  prevPageX!: number;
  prevScrollLeft!: number;

  constructor(private renderer: Renderer2, @Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      // Create a link element
      this.linkElement = this.renderer.createElement('link');
      this.renderer.setAttribute(this.linkElement, 'rel', 'stylesheet');
      this.renderer.setAttribute(this.linkElement, 'href', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css');

      // Append the link element to the head
      this.renderer.appendChild(document.head, this.linkElement);
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      // Add event listeners for arrows
      this.renderer.listen(this.leftArrow.nativeElement, 'click', this.scrollLeft.bind(this));
      this.renderer.listen(this.rightArrow.nativeElement, 'click', this.scrollRight.bind(this));

      // Add event listeners for dragging
      this.renderer.listen(this.carousel.nativeElement, 'mousedown', this.dragStart.bind(this));
      this.renderer.listen(this.carousel.nativeElement, 'mousemove', this.dragging.bind(this));
      this.renderer.listen(this.carousel.nativeElement, 'mouseup', this.dragStop.bind(this));
      this.renderer.listen(this.carousel.nativeElement, 'mouseleave', this.dragStop.bind(this));

      this.showHideIcons();
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser && this.linkElement) {
      // Remove the link element when the component is destroyed
      this.renderer.removeChild(document.head, this.linkElement);
    }
  }

  scrollLeft(): void {
    if (this.isBrowser) {
      const carousel = this.carousel.nativeElement;
      const firstImageWidth = carousel.querySelector('img').clientWidth + 14;
      carousel.scrollLeft -= firstImageWidth;
      setTimeout(() => this.showHideIcons(), 60);
    }
  }

  scrollRight(): void {
    if (this.isBrowser) {
      const carousel = this.carousel.nativeElement;
      const firstImageWidth = carousel.querySelector('img').clientWidth + 14;
      carousel.scrollLeft += firstImageWidth;
      setTimeout(() => this.showHideIcons(), 60);
    }
  }

  showHideIcons(): void {
    if (this.isBrowser) {
      const carousel = this.carousel.nativeElement;
      const scrollWidth = carousel.scrollWidth - carousel.clientWidth;
      this.leftArrow.nativeElement.style.display = carousel.scrollLeft === 0 ? "none" : "block";
      this.rightArrow.nativeElement.style.display = carousel.scrollLeft >= scrollWidth ? "none" : "block";
    }
  }

  dragStart(e: MouseEvent): void {
    if (this.isBrowser) {
      this.isDragStart = true;
      this.prevPageX = e.pageX;
      this.prevScrollLeft = this.carousel.nativeElement.scrollLeft;
    }
  }

  dragging(e: MouseEvent): void {
    if (this.isBrowser && this.isDragStart) {
      e.preventDefault();
      const carousel = this.carousel.nativeElement;
      const positionDiff = e.pageX - this.prevPageX;
      carousel.scrollLeft = this.prevScrollLeft - positionDiff;
      this.showHideIcons();
    }
  }

  dragStop(): void {
    if (this.isBrowser) {
      this.isDragStart = false;
    }
  }
}


// currentIndex = 0;
// currentCard: Card;
// cards: Card[] = cards;

// constructor() {
//   this.currentCard = this.cards[0];
// }

// prev() {
//   this.currentIndex = (this.currentIndex === 0) ? this.cards.length - 1 : this.currentIndex - 1;
//   this.currentCard = this.cards[this.currentIndex];
// }

// next() {
//   this.currentIndex = (this.currentIndex === this.cards.length - 1) ? 0 : this.currentIndex + 1;
//   this.currentCard = this.cards[this.currentIndex];
// }

// goTo(index: number) {
//   this.currentIndex = index;
//   this.currentCard = this.cards[this.currentIndex];
// }