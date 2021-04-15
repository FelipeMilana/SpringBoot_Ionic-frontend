import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../configs/api.config";
import { ClientInsertDTO } from "../../models/client.insert.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class ClientService {

    constructor(
        public http: HttpClient, 
        public storage: StorageService) {
    }

    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clients/${id}`);
    }
    
    findByEmail(email: String) {
        return this.http.get(`${API_CONFIG.baseUrl}/clients/email?value=${email}`);
    }

    insert(obj: ClientInsertDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/clients`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}