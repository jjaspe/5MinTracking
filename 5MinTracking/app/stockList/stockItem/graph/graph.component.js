"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var index_1 = require('../../shared/index');
var GraphComponent = (function () {
    function GraphComponent(stockService) {
        this.stockService = stockService;
        this.goBackClicked = new core_1.EventEmitter();
        this.boundUpdateStocks = this.updateStocks.bind(this);
        this.boundStockChanged = this.stockChanged.bind(this);
        this.resetting = false;
        this.xAxis = Array(300 || 0).slice().map(function (v, i) { return i; });
    }
    GraphComponent.prototype.ngOnInit = function () {
        this.updating = true;
        this.loadGraphValues();
    };
    GraphComponent.prototype.ngOnChanges = function () {
        this.loadGraphValues();
    };
    GraphComponent.prototype.loadGraphValues = function () {
        this.options = {
            title: { text: this.stock.name },
            xAxis: this.xAxis,
            series: [{
                    data: this.stock.oldValues.map(function (n) { return Number(n); }),
                }]
        };
        this.interval = setInterval(this.boundUpdateStocks, this.stockService.intervalInMilliseconds * 1000, this.stock);
    };
    GraphComponent.prototype.updateStocks = function (stock) {
        if (this.stockService && this.updating) {
            this.stockService.updateStock(this.stock, this.boundStockChanged);
        }
    };
    GraphComponent.prototype.resetView = function () {
        var _this = this;
        this.resetting = true;
        setTimeout(function () { return _this.resetting = false; }, 0);
    };
    GraphComponent.prototype.stockChanged = function (newValue, stockName) {
        newValue = Number(newValue);
        if (this.options && stockName == this.stock.name) {
            this.chart.series[0].addPoint(newValue);
        }
    };
    GraphComponent.prototype.saveInstance = function (chartInstance) {
        this.chart = chartInstance;
    };
    GraphComponent.prototype.stopStart = function () {
        clearInterval(this.interval);
        this.updating = !this.updating;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', index_1.Stock)
    ], GraphComponent.prototype, "stock", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GraphComponent.prototype, "goBackClicked", void 0);
    GraphComponent = __decorate([
        core_1.Component({
            selector: 'graph',
            templateUrl: 'app/stockList/stockItem/graph/graph.component.html',
        }), 
        __metadata('design:paramtypes', [index_1.StockService])
    ], GraphComponent);
    return GraphComponent;
}());
exports.GraphComponent = GraphComponent;
//# sourceMappingURL=graph.component.js.map