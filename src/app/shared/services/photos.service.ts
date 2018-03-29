import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PhotosService {
  constructor(private http: HttpClient) {
  }

  uploadPhoto(data) {
    return this.http.post('http://localhost:3000/photos', data);
  }

  getPhotos() {
    return this.http.get('http://localhost:3000/photos');
  }

  delPhotoById(id) {
    return this.http.delete('http://localhost:3000/photos/' + id);
  }

  updatePhotoById(id, data) {
    return this.http.patch('http://localhost:3000/photos/' + id, data);
  }
}
