import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  set(data:any){
    localStorage.setItem('token',data.token);
    localStorage.setItem('id',data.id);
  }
  handle(data:any){
    this.set(data);
  }

  getToken(){
    localStorage.getItem('token');
  }
  getId(){
    localStorage.getItem('id');
  }
  remove(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }

  decode(payload:any){
   return JSON.parse(atob(payload));
  }
  payload(token:any){
    const payload=token.split('.')[1];
    console.log('payload:',payload)
    return this.decode(payload);
  }
  isValide(){
    const token=this.getToken();
    const id=this.getId();

    if(token!=null){
      const playload=this.payload(token);
      if(playload){
        return id==playload.id;
      }
    }
    return false;
  }
  getInfos(){
    const token=this.getToken();
    if(token!=null){
      const playload=this.payload(token);
      return playload ? playload :null;
    }
    return null;
  }

  loggedIn(){
    return this.isValide();
  }
}
