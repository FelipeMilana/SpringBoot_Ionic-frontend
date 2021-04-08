import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../configs/api.config";
import { ClientDTO } from "../../models/client.dto";
import { ClientInsertDTO } from "../../models/client.insert.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class ClientService {

    constructor(
        public http: HttpClient, 
        public storage: StorageService) {
    }

    findByEmail(email: String) : Observable<ClientDTO>{
        return this.http.get<ClientDTO>(`${API_CONFIG.baseUrl}/clients/email?value=${email}`);
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