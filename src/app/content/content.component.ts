import {Component, OnDestroy, OnInit} from '@angular/core';
import {Photo} from '../shared/models/photo.model';
import {PhotosService} from '../shared/services/photos.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnDestroy {

  s1: Subscription;
  photos: any;

  constructor(private photosService: PhotosService) {
  }

  ngOnInit() {
    this.loadPhotos();
  }

  loadPhotos() {
    this.s1 = this.photosService.getPhotos()
      .subscribe((photos: Photo[]) => {
        this.photos = photos;
      });
  }

  ngOnDestroy() {
    if (this.s1) {
      this.s1.unsubscribe();
    }
  }
}
