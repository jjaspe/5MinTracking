import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { StockService } from './stockList/shared/stock.service'
import { StockListComponent, StockItemComponent, GraphComponent } from './stockList/index'
import { HttpModule, Response, Headers, RequestOptions } from '@angular/http';
import { ChartModule} from 'angular2-highcharts';
import { HttpService } from './Utilities/http.service'

@NgModule({
  imports:      [ BrowserModule,HttpModule,ChartModule ],
  declarations: [ AppComponent,StockListComponent,StockItemComponent,GraphComponent],
  bootstrap:    [ AppComponent ],
  providers: [StockService,HttpService]
})
export class AppModule { }
