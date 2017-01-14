import { Component, OnInit,OnChanges, Input,EventEmitter,Output } from '@angular/core';
import { Stock,StockService } from '../../shared/index'

@Component({
    selector: 'graph',
    templateUrl: 'app/stockList/stockItem/graph/graph.component.html',    
})
export class GraphComponent implements OnInit, OnChanges {
    @Input() stock:Stock;
    @Output() goBackClicked=new EventEmitter<any>();
    boundUpdateStocks:any = this.updateStocks.bind(this);
    boundStockChanged:any = this.stockChanged.bind(this);
    interval:any;
    options:Object;
    chart:any;
    resetting:boolean;
    updating:boolean;
    xAxis:any;
    constructor(private stockService:StockService) { 
       this.resetting=false;
       this.xAxis=[...Array(300||0)].map((v,i)=>i)
    }

    ngOnInit() { 
        this.updating=true;
        this.loadGraphValues();       
    }
    
    ngOnChanges(){
        this.loadGraphValues();
    }
    
    loadGraphValues(){
        this.options = {
            title : { text : this.stock.name },
            xAxis:this.xAxis,
            series: [{
                data: this.stock.oldValues.map(n=>Number(n)),
            }]
        };
        this.interval= setInterval(this.boundUpdateStocks,this.stockService.intervalInMilliseconds*1000,this.stock); 
    }
    
    updateStocks(stock:Stock){
        if(this.stockService && this.updating){
            this.stockService.updateStock(this.stock,this.boundStockChanged); 
        }        
    }
    
    resetView(){
        this.resetting=true;
        setTimeout(()=>this.resetting=false,0);
    }
    
    stockChanged(newValue:any,stockName:string){
        newValue=Number(newValue);
        if(this.options && stockName == this.stock.name){
            this.chart.series[0].addPoint(newValue);
        }
    }
    
    saveInstance(chartInstance) {
        this.chart = chartInstance;
    }
    
    stopStart(){
        clearInterval(this.interval);
        this.updating=!this.updating;
    }

}