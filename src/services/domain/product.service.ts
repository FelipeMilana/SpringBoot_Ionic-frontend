import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../configs/api.config";

@Injectable()
export class ProductService {

    constructor(public http: HttpClient) {
    }

    findByCategories(categoryId: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/products/pageSearch?categories=${categoryId}`);
    }
}