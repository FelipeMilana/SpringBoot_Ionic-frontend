import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../configs/api.config";
import { LocalUser } from "../models/local_user";
import { LoginDTO } from "../models/login.dto";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthService {

    constructor(
        public http: HttpClient,
        public storage: StorageService) {
    }
    
    authenticate(logs: LoginDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`, 
            logs, 
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    successfulLogin(authorizationValue: string) {
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token : tok
        };
        this.storage.setLocalUser(user);
    }

    logout() {
        this.storage.setLocalUser(null);    
    }
}