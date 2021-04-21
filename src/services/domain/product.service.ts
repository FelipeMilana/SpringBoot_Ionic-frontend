import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../configs/api.config";
import { ProductDTO } from "../../models/product.dto";
import { ProductInsertDTO } from "../../models/product.insert.dto";
import { ImageUtilService } from "../image-util.service";

@Injectable()
export class ProductService {

    constructor(
        public http: HttpClient,
        public imgUtilService: ImageUtilService) {
    }

    findAll() : Observable<ProductDTO[]> {
        return this.http.get<ProductDTO[]>(`${API_CONFIG.baseUrl}/products`);
    }

    findById(id: string) : Observable<ProductDTO> {
        return this.http.get<ProductDTO>(`${API_CONFIG.baseUrl}/products/${id}`);
    }
    
    findByCategories(categoryId: string, page: number = 0, linesPerPage: number = 24) {
        return this.http.get(`${API_CONFIG.baseUrl}/products/pageSearch?categories=${categoryId}&page=${page}&linesPerPage=${linesPerPage}`);
    }

    findByProductName(name: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/products/pageSearch?name=${name}`);
    }

    findByProductsByNameInCategories(categoryId: string, name: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/products/pageSearch?categories=${categoryId}&name=${name}`);
    }

    delete(id: string) {
        return this.http.delete(`${API_CONFIG.baseUrl}/products/${id}`);
    }

    insert(obj: ProductInsertDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/products`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            } 
        )
    }

    update(obj: ProductDTO, id: string) {
        return this.http.put(
            `${API_CONFIG.baseUrl}/products/${id}`,
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
            `${API_CONFIG.baseUrl}/products/${id}/picture`,
            formData,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}