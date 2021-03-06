import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";
import { ClientDTO } from "../../models/client.dto";
import { StorageService } from "../storage.services";

@Injectable()
export class ClientService {

    constructor(
        public http: HttpClient,
        public storage: StorageService) {

    }

    findByEmail(email: string) : Observable<ClientDTO> {
        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});

        return this.http.get<ClientDTO>(
            `${API_CONFIG.baseUrl}/clientes/email?value=${email}`,
            {'headers':authHeader});
    }

    getImageFromBucket(id: string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType: 'blob'})
    }
}