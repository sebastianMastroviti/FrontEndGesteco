import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ClientsService {

  private baseUrl: string = 'http://localhost:3000/contract/58b572b5bebd8d0810d10b6c';
  constructor(private http: Http) { }

  getContract() {
    let contract = this.http
      .get('http://localhost:3000/contract/58b572b5bebd8d0810d10b6c')
      .subscribe(data => console.log(data.json()));
    return contract;
  }


}
