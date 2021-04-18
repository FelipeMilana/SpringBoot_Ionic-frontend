import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../configs/api.config";
import { CategoryDTO } from "../../models/category.dto";
import { ImageUtilService } from "../image-util.service";

@Injectable()
export class CategoryService {

    constructor(
        public http: HttpClient,
        public imgUtilService: ImageUtilService) {
    }

    findAll() : Observable<CategoryDTO[]> {
        return this.http.get<CategoryDTO[]>(`${API_CONFIG.baseUrl}/categories`);
    }

    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/categories/${id}`);
    }

    update(obj: CategoryDTO, id: string) {
        return this.http.put(
            `${API_CONFIG.baseUrl}/categories/${id}`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    uploadPicture(picture, id: string) {
        let pictureBlob = this.imgUtilService.dataUriToBlob(picture);

        let formData: FormData = new FormData();
        formData.set('file', pictureBlob, 'file.png');

        return this.http.post(
            `${API_CONFIG.baseUrl}/categories/${id}/picture`,
            formData,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}