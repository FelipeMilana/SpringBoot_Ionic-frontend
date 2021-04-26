import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../configs/api.config";
import { OrderInsertDTO } from "../../models/order.insert.dto";

@Injectable()
export class OrderService {

    constructor(
        public http: HttpClient) {
    }

    findAll() {
        return this.http.get(`${API_CONFIG.baseUrl}/orders`);
    }
    
    findByPage(direction: string = "DESC") {
        return this.http.get(`${API_CONFIG.baseUrl}/orders/page?direction=${direction}`);
    }

    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/orders/${id}`);
    }
    
    insert(obj: OrderInsertDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/orders`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}