import { Component, OnInit, Input } from '@angular/core';
import { Stock, StockService } from './shared/index';
import { Observable} from "rxjs/Rx";

@Component({
    selector: 'stock-list',
    templateUrl: 'app/stockList/stockList.component.html'
})
export class StockListComponent implements OnInit {
    observableStocks:Observable<Stock[]>
    stocks:Stock[];
    selectedStock:Stock;
    mode:string = "list";
    
    constructor(private stockService:StockService) { }

    ngOnInit() { 
        this.stockService.getCurrentStocks(5000,0).subscribe(n=>{
          this.stocks=n;  
        });
    }
    
    showGraph(stock:Stock){
        this.selectedStock=stock;
        this.mode='graph';
    }
    
    goBackClicked(event:any){
        this.selectedStock=null;
        this.mode='list';
    }

}