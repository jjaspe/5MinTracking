import { Injectable, OnInit } from '@angular/core';
import { Stock } from './stock.model';
import { Observable } from "rxjs/Rx";
import { Companies } from './companies'
import { HttpService } from '../../Utilities/http.service'


@Injectable()
export class StockService {
    url:string="http://finance.google.com/finance/info?client=ig&q=NSE:";
    obsStocks:Observable<Stock[]>;
    stocks:Stock[]=[];
    intervalInMilliseconds:number=5;
    constructor(private httpService:HttpService) {
        this.intervalInMilliseconds=1; 
        this.getStocksFromAPI(1,0);
        this.obsStocks=Observable.of(this.stocks);
    }
    
    getFakeStocks(){
       let fakeStocks:Stock[] =[{name:"fake1",value:1,oldValues:[]},{name:"fake2",value:2,oldValues:[1.1,1.2,1.3,1.4,1.5]}]
       this.obsStocks=Observable.of(fakeStocks);
       return this.obsStocks;
    }
    
    getStockFromAPI(stockName:string){
        let fullUrl=this.url+stockName;
        
    }
    
    updateStock(stock:Stock,callback:any){
        let fullUrl=this.url+stock.name;
        this.httpService.get(fullUrl).subscribe(s=>{
            stock.oldValues.push(s[0].l);
            if(stock.oldValues.length>=(5*60/this.intervalInMilliseconds))
                stock.oldValues.shift();
            callback(s[0].l,s[0].t);
        })    
    }
    
    getSymbols(limit:number,offset:number){
        let tCompanies=Companies.slice(offset,limit+offset);
        return tCompanies;
    }
    
    getStocksFromAPI(limit:number,offset:number){
        let companies=this.getSymbols(limit,offset);
        companies=companies.filter(n=>n.active);
        companies.forEach(n=>{
            let fullUrl=this.url+n.abb;
            setTimeout(this.httpService.get(fullUrl).subscribe(s=>{
                this.stocks.push({name:n.abb,value:s[0].l,oldValues:[]})
            }),5000);
        })
    }
    
    getCurrentStocks(limit:number,offset:number){
        if(!this.obsStocks){            
            this.obsStocks=Observable.of(this.stocks);
        }
        this.getStocksFromAPI(limit,offset);
        return this.obsStocks;
        
    }

}