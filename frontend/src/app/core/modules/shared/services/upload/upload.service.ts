import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../../../../environments/environment';

@Injectable()
export class UploadService {

    constructor() {
    }

    previewPhoto(files: object): Observable<object> {
        const reader = new FileReader();
        const file = files[0];
        reader.readAsDataURL(file);

        return Observable.create((observer) => {
            reader.onloadend = () => {
                const photoData = {
                    file: file,
                    img: reader.result
                };

                observer.next(photoData);
            };
        });
    }

    createFormData(file: File, fileFieldName: string, formFields?: object): FormData {
        const data = new FormData();
        data.append(fileFieldName, file, file.name);

        if (formFields) {
            Object.entries(formFields).forEach(
                ([key, value]) => data.append(key, value)
            );
        }

        return data;
    }

    imageUrl(folder: string, file: string): string {
        return file.includes('http') ? file : `${environment.images}/${folder}/${file}`;
    }

}
