import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { AddNewComponent } from './content/add-new/add-new.component';
import { ItemListComponent } from './content/item-list/item-list.component';
import {PhotosService} from './shared/services/photos.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ImageUploadComponent, ImageUploadModule} from 'angular2-image-upload';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    AddNewComponent,
    ItemListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ImageUploadModule.forRoot()
  ],
  providers: [PhotosService, ImageUploadComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
