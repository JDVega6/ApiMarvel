import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from '@environment/environment.development';
import { Character } from '../interfaces/character.interface';
import {  map, Observable } from 'rxjs';
import { ResponseObject } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) {}
  
getCharacters():Observable<ResponseObject>{
  return this.http.get<ResponseObject>(`${environment.Url}?ts=1&apikey=${environment.apiKey}&hash=${environment.hash}`).pipe(map((data:any)=>data.data.results));
}

getComics(id:number):Observable<ResponseObject>{
  return this.http.get<Character>(`${environment.Url}/${id}/comics?ts=1&apikey=${environment.apiKey}&hash=${environment.hash}`).pipe(map((data:any)=>data.data.comic));
}

searchCharacters(query='', orderBy=''){
  let urlBase = `${environment.Url}?`;
  let search = `ts=1&apikey=${environment.apiKey}&hash=${environment.hash}&limit=${100}&offset=${0}`;

  urlBase += query != ''? `nameStartsWith=${query}&`:'';
  urlBase += orderBy != ''? `orderBy=${orderBy}&`:'';

  return this.sendQuery(urlBase + search);
}

sendQuery(query=''){
  return this.http.get<any>(`${query}`).pipe(map((data:any)=>data.data.results));
}

}
