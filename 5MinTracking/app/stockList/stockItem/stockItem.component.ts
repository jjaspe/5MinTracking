import { Component, OnInit, Input } from '@angular/core';
import { Stock } from '../shared/index';

@Component({
    selector: 'stockItem',
    templateUrl: 'app/stockList/stockItem/stockItem.component.html'
})

export class StockItemComponent implements OnInit {
    @Input() stock:Stock;
    constructor() { }

    ngOnInit() { }

}