import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../interfaces/item.interface';
import { environments } from '../../environments/envionments';

@Injectable({providedIn: 'root'})
export class ItemsService {

    private baseURL: string = environments.baseURL

    constructor(private httpClient: HttpClient) { }

    getItems(): Observable<Item[]> {
        console.log('entre')
        return this.httpClient.get<Item[]>(`${ this.baseURL }/items`)
    }
    
}