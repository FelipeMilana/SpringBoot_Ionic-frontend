import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../configs/api.config";
import { AddressInsertDTO } from "../../models/address.insert.dto";
import { ClientInsertDTO } from "../../models/client.insert.dto";
import { ClientUpdateDTO } from "../../models/client.update.dto";
import { ImageUtilService } from "../image-util.service";
import { StorageService } from "../storage.service";

@Injectable()
export class ClientService {

    constructor(
        public http: HttpClient, 
        public storage: StorageService,
        public imgUtilService: ImageUtilService) {
    }

    findAll() {
        return this.http.get(`${API_CONFIG.baseUrl}/clients`);
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

    insertAddress(obj: AddressInsertDTO, id: string) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/clients/${id}/addAddress`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        )
    }
    
    update(obj: ClientUpdateDTO, id: string) {
        return this.http.put(
            `${API_CONFIG.baseUrl}/clients/${id}`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        )
    }

    uploadPicture(picture) {
        let pictureBlob = this.imgUtilService.dataUriToBlob(picture);

        let formData: FormData = new FormData();
        formData.set('file', pictureBlob, 'file.png');

        return this.http.post(
            `${API_CONFIG.baseUrl}/clients/picture`,
            formData,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    delete(id: string) {
        return this.http.delete(`${API_CONFIG.baseUrl}/clients/${id}`);
    }
}