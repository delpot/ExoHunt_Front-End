import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('videoElement') videoElement!: ElementRef;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    const video: HTMLVideoElement = this.videoElement.nativeElement;
    video.playbackRate = 0.6;
    video.play();
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    const paragraphTriggers = [80, 110, 210];

    for (let i = 1; i <= paragraphTriggers.length; i++) {
      const paragraph = this.el.nativeElement.querySelector(`.paragraph-${i}`);
      if (paragraph) {
        if (scrollPosition >= paragraphTriggers[i - 1]) {
          paragraph.classList.add('sticky');
        } else {
          paragraph.classList.remove('sticky');
        }
      }
    }
  }
}
