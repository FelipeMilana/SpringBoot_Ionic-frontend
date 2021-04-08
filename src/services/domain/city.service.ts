import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../configs/api.config";
import { CityDTO } from "../../models/city.dto";

@Injectable()
export class CityService {

    constructor(public http: HttpClient) {
    }

    findAll() : Observable<CityDTO[]> {
        return this.http.get<CityDTO[]>(`${API_CONFIG.baseUrl}/cities`);
    }

    findAllByState(stateId: string) : Observable<CityDTO[]> {
        return this.http.get<CityDTO[]>(`${API_CONFIG.baseUrl}/states/${stateId}/cities`);
    }
}