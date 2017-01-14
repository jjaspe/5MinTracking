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
var Rx_1 = require("rxjs/Rx");
var companies_1 = require('./companies');
var http_service_1 = require('../../Utilities/http.service');
var StockService = (function () {
    function StockService(httpService) {
        this.httpService = httpService;
        this.url = "http://finance.google.com/finance/info?client=ig&q=NSE:";
        this.stocks = [];
        this.intervalInMilliseconds = 5;
        this.intervalInMilliseconds = 1;
        this.getStocksFromAPI(1, 0);
        this.obsStocks = Rx_1.Observable.of(this.stocks);
    }
    StockService.prototype.getFakeStocks = function () {
        var fakeStocks = [{ name: "fake1", value: 1, oldValues: [] }, { name: "fake2", value: 2, oldValues: [1.1, 1.2, 1.3, 1.4, 1.5] }];
        this.obsStocks = Rx_1.Observable.of(fakeStocks);
        return this.obsStocks;
    };
    StockService.prototype.getStockFromAPI = function (stockName) {
        var fullUrl = this.url + stockName;
    };
    StockService.prototype.updateStock = function (stock, callback) {
        var _this = this;
        var fullUrl = this.url + stock.name;
        this.httpService.get(fullUrl).subscribe(function (s) {
            stock.oldValues.push(s[0].l);
            if (stock.oldValues.length >= (5 * 60 / _this.intervalInMilliseconds))
                stock.oldValues.shift();
            callback(s[0].l, s[0].t);
        });
    };
    StockService.prototype.getSymbols = function (limit, offset) {
        var tCompanies = companies_1.Companies.slice(offset, limit + offset);
        return tCompanies;
    };
    StockService.prototype.getStocksFromAPI = function (limit, offset) {
        var _this = this;
        var companies = this.getSymbols(limit, offset);
        companies = companies.filter(function (n) { return n.active; });
        companies.forEach(function (n) {
            var fullUrl = _this.url + n.abb;
            setTimeout(_this.httpService.get(fullUrl).subscribe(function (s) {
                _this.stocks.push({ name: n.abb, value: s[0].l, oldValues: [] });
            }), 5000);
        });
    };
    StockService.prototype.getCurrentStocks = function (limit, offset) {
        if (!this.obsStocks) {
            this.obsStocks = Rx_1.Observable.of(this.stocks);
        }
        this.getStocksFromAPI(limit, offset);
        return this.obsStocks;
    };
    StockService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_service_1.HttpService])
    ], StockService);
    return StockService;
}());
exports.StockService = StockService;
//# sourceMappingURL=stock.service.js.map