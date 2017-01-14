import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable,Subject}  from 'rxjs/Rx';

@Injectable()
export class HttpService {

    constructor(private http: Http) { }

    get(url){
        return this.http.get(url).map(this.extractUserData).catch(this.handleError);
    }
    
    post(url,object):Observable<Response>{
        let headers= new Headers({ 'Content-Type': 'application/json' });
        let options= new RequestOptions({headers:headers}); 
        let json=JSON.stringify(object);
        return this.http.post(url,json,options);
    }
    
    delete(url):Observable<Response>{
        let headers= new Headers({ 'Content-Type': 'application/json' });
        let options= new RequestOptions({headers:headers});
        
        return this.http.delete(url,options);
    }    
    
    extractUserData(res:any){
        res = JSON.parse(res._body.slice(3));
        return (res);
    }
    
    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error({error:error});
        console.error({errorMsg:errMsg});
        return Observable.throw(errMsg);
    }
}