import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('videoElement')
  videoElement!: ElementRef;

  constructor() {}

  ngAfterViewInit(): void {
    const video: HTMLVideoElement = this.videoElement.nativeElement;
    video.playbackRate = 0.6;
    video.play();
  }
}
