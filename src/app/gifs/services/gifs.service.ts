import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _apiKey: string = 'wYlAiVNGQGVe0BeRHhjBAzVjNVpNEzEy';
  private _historial: string[] = [];

  public resultados: any[] = [];

  get historial(){
    
    return [...this._historial];
  }
  constructor(private http: HttpClient){}
  buscarGifs( query:string){
    query = query.trim().toLowerCase();
    if(!this._historial.includes( query )){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);
    }

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=wYlAiVNGQGVe0BeRHhjBAzVjNVpNEzEy&q=${ query }&limit=10`)
        .subscribe( ( resp:any ) => {
            console.log( resp.data );
            this.resultados = resp.data;
          }
        )
  }

  // async buscarGifs( query:string){
  //   query = query.trim().toLowerCase();
  //   if(!this._historial.includes( query )){
  //     this._historial.unshift( query );
  //     this._historial = this._historial.splice(0,10);
  //   }

  //   const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=wYlAiVNGQGVe0BeRHhjBAzVjNVpNEzEy&q=dragon ball z&limit=10');
  //   const data = await resp.json();
  //   console.log(data);
  
  // fetch('https://api.giphy.com/v1/gifs/search?api_key=wYlAiVNGQGVe0BeRHhjBAzVjNVpNEzEy&q=dragon ball z&limit=10')
  //     .then( resp => 
  //       {
  //         resp.json().then(data =>
  //           {
  //             console.log(data);
  //           } 
  //         )
  //       } 
  //     )

  // }
}
