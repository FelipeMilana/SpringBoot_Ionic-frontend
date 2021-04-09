import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../configs/api.config";
import { ProductDTO } from "../../models/product.dto";

@Injectable()
export class ProductService {

    constructor(public http: HttpClient) {
    }

    findById(id: string) : Observable<ProductDTO> {
        return this.http.get<ProductDTO>(`${API_CONFIG.baseUrl}/products/${id}`);
    }
    
    findByCategories(categoryId: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/products/pageSearch?categories=${categoryId}`);
    }
}