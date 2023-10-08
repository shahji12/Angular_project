import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Records } from '../Models/records.model';
import { signup } from '../Models/signup';
import { login } from '../Models/login';
import { AuthGuard } from 'app/shared/auth.guard';
import { slider } from 'app/Models/slider';
import { Videos } from 'app/Models/videos';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private sharedSidebar = new Subject<string>();
  openSidebar$ = this.sharedSidebar.asObservable();
  private sharedMain = new Subject<string>();
  sideMain$ = this.sharedMain.asObservable();

  constructor(private http : HttpClient,
              // private auth : AuthGuard
    ) { }


    // httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //     "Access-Control-Allow-Origin": "*",

    //   } ),responseType: 'text' as 'json'
    // };


  clickToOpen(sidebar: string, main: string){
    this.sharedSidebar.next(sidebar);
    this.sharedMain.next(main);
  }
//Registration method

registration(signup: signup){
  return this.http.post(environment.apiUrl2+'/addUser',signup)
}
// Login method
login(login: login){
  return this.http.post(environment.apiUrl2+'/logUser',login)
}

isLoggedIn(){
 return localStorage.getItem('token') != null;
}

logOut(){
  return localStorage.removeItem('token');
}
//Http get method
getData(): Observable<Records[]>{
  return this.http.get<Records[]>(environment.url)
  }

getToken(){
  return localStorage.getItem('token') || ''
}

getSliders(): Observable<slider[]>{
  return this.http.get<slider[]>(environment.apiUrl2+'/slider')
}

addSlider(add: any){
  return this.http.post<any>(environment.apiUrl2+'/addSlider',add)
}
updateSlider(id: any, data :slider){
  return this.http.put(environment.apiUrl2+`/updateSlider/${id}`,data)
}
deleteSliderById(id:any){
  return this.http.delete<any>(environment.apiUrl2+`/deleteSlider/${id}`)
}


getVideos():Observable<Videos[]>{
  return this.http.get<any>(environment.apiUrl2+'/get-videos')
}

addVideos(data : Videos){
 return this.http.post<any>(environment.apiUrl2+'/add-videos',data)
}

deleteVideo(id : any){
  return this.http.delete(environment.apiUrl2+`/delete-videos/${id}`)
}

updateVideos(id : any, data : Videos){
  return this.http.put(environment.apiUrl2+`/update-videos/${id}`, data);
}



// getAllPosts(){
//   return this.http.get('https://taskforum.herokuapp.com/api/post/')
// }

}
