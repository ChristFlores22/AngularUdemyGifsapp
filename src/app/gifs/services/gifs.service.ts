import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _apiKey: string = 'wYlAiVNGQGVe0BeRHhjBAzVjNVpNEzEy';
  private _servicioUrl:string ='https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  public resultados: Gif[] = [];

  get historial(){
    
    return [...this._historial];
  }
  constructor(private http: HttpClient){
    //1ra forma
    // if (localStorage.getItem('historial')){
    //   this._historial = JSON.parse((localStorage.getItem('historial')!));
    // }
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs( query:string){
    query = query.trim().toLowerCase();
    if(!this._historial.includes( query )){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams().
      set('api_key',this._apiKey).
      set('limit','10').
      set('q', query);
      

    this.http.get<SearchGifsResponse>(`${ this._servicioUrl }/search`, { params })
        .subscribe( ( resp : SearchGifsResponse ) => {
            console.log( resp.data );
            this.resultados = resp.data;
            localStorage.setItem('resultados',JSON.stringify(this.resultados));
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
