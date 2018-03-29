import {Component, Input, OnDestroy} from '@angular/core';
import {PhotosService} from '../../shared/services/photos.service';
import {Subscription} from 'rxjs/Subscription';
import * as $ from 'jquery';
import {Photo} from '../../shared/models/photo.model';
import {ContentComponent} from '../content.component';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})

export class ItemListComponent implements OnDestroy {

  @Input() photos: any;

  s1: Subscription;
  s2: Subscription;
  currentPhoto = {
    id: '',
    title: '',
    url: ''
  };
  modalType = '';
  selectedFile: File = null;
  imageDescription: string;


  constructor(private photosService: PhotosService,
              private content: ContentComponent) {
  }

  trimTitle(title: string) {
    if (title) {
      if (title.length > 40) {
        return title.substring(0, 37) + '...';
      }
      return title;
    }
    return '';
  }

  fileChangeInput(event) {
    this.selectedFile = <File>event.file;
  }

  getCurrentPhoto(id: string, action: string) {
    this.modalType = action;
    this.currentPhoto = this.photos.find((item, index, array) => {
      return item.id === id;
    });
    this.imageDescription = this.currentPhoto.title;
  }

  deletePhoto(photo: Photo) {
    this.s1 = this.photosService.delPhotoById(photo.id)
      .subscribe((res: any) => {
        this.photos.forEach((item, index, array) => {
          if (item.id === photo.id) {
            array.splice(index, 1);
            $('#modalClose').trigger('click');
          }
        });
      });
  }

  updatePhoto(id) {
    const fd = new FormData();
    const title = this.imageDescription || 'description';
    if (this.selectedFile) {
      fd.append('file', this.selectedFile);
    }
    fd.append('title', title);
    this.s2 = this.photosService.updatePhotoById(id, fd)
      .subscribe(() => {
        $('#modalClose').trigger('click');
        this.content.loadPhotos();
      });
  }

  ngOnDestroy() {
    if (this.s1) {
      this.s1.unsubscribe();
    }
    if (this.s2) {
      this.s2.unsubscribe();
    }
  }

}
