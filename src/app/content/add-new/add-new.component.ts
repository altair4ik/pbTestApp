import {Component, ViewChild} from '@angular/core';
import * as $ from 'jquery';
import {PhotosService} from '../../shared/services/photos.service';
import {ContentComponent} from '../content.component';
import {ImageUploadComponent} from 'angular2-image-upload';


@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent {

  selectedFiles: File = null;
  imageDescription: string;
  isButtonSaveDisable = true;

  constructor(private photosService: PhotosService,
              private content: ContentComponent) {
  }

  @ViewChild(ImageUploadComponent) imageUploadComponent: ImageUploadComponent;

  fileChangeInput(event) {
    this.selectedFiles = <File>event.file;
    this.isButtonSaveDisable = false;
  }

  onRemoved() {
    this.isButtonSaveDisable = true;
  }

  onSubmit() {
    const fd = new FormData();
    const title = this.imageDescription || 'description';
    fd.append('file', this.selectedFiles);
    fd.append('title', title);
    this.photosService.uploadPhoto(fd)
      .subscribe(() => {
        $('#modalAddClose').trigger('click');
        this.content.loadPhotos();
        this.imageDescription = '';
        this.imageUploadComponent.deleteAll();
      });
  }
}
