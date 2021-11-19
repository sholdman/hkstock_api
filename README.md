# HK Stocke API

*** How to run this project: ***
- Clone or download this repository;
- Navigate to the project folder;
- Once in project folder, run ```npm install```
- Run command with Node ```npm start```
- Open [http://localhost:3000](http://localhost:3000) to view the welcome page in the browser

## API Documentation

The Rest API to the stock_api is described below.

### Single / Multiple Stock Quote
- Request
```http
GET /stock/quote?code=5
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `code` | `string` | stock code, for multiple quote, use "," as a separator, eg. 5,823,700  |

- Response

Example
    
    {"code":"00700","tcName":"騰訊控股","nominal":"490.20","change":"-6.600","changePct":"-1.329%","high":"495.200","low":"485.000","transaction":"7.383M","turnover":"3.616B","prevClose":"496.800","open":"486.600","oneMonthHigh":"515.000","oneMonthLow":"453.400","marketCap":"4,705.455B","shortSell":"(18/11)2.270B","bid":"490.400","ask":"490.600","sma10":"484.170","sma20":"484.890","sma50":"480.212","sma100":"490.803","sma250":"571.110","noOfTransaction":"8295","ccy":"HKD","high52w":"773.900","low52w":"412.200","boardLot":"100","entryFee":"49,020","rsi14":"55.607","bidAskSpread":"0.200/0.200","tenDayReturn":"4.921%","pe":"23.849/27.381","yield":"0.326/0.387","earningPerShare":"RMB 16.844","relatedStockCode":["00772","00780","02858"]}
    
### Stock Top 20
- Request
```http
GET /stock/top20?mainType=stock&subType=turnove&version=basic
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `mainType` | `string` | *stock*: Stocks<br/>*war*: Warrants<br/>*cbbc*: CBBCs|
| `subType` | `string` | *turnover*: Turnover<br>*up*: %Gainer<br>*down*: %Losers<br>*volume*: Volume  |
| `version` | `string` | *basic*: retrun [code, tcName, nominal, change, changePct, high, low, turnover, ccy] for each stock. <br>*full*: Return field as same as ```/stock/quote``` API|

- Response

Example
    
    {"timestamp":"19/11/2021 11:51","data":[{"code":"09988","tcName":"阿里巴巴－ＳＷ","nominal":"139.600","change":"-16.400","changePct":"-10.513%","high":"142.200","low":"139.200","turnover":"9.150B","ccy":"HKD"},{"code":"00700","tcName":"騰訊控股","nominal":"491.000","change":"-5.800","changePct":"-1.167%","high":"495.200","low":"485.000","turnover":"3.973B","ccy":"HKD"},{"code":"06098","tcName":"碧桂園服務","nominal":"51.750","change":"-7.200","changePct":"-12.214%","high":"52.600","low":"49.100","turnover":"2.910B","ccy":"HKD"},{"code":"03690","tcName":"美團－Ｗ","nominal":"275.400","change":"-10.000","changePct":"-3.504%","high":"282.200","low":"273.000","turnover":"2.565B","ccy":"HKD"},{"code":"02800","tcName":"盈富基金","nominal":"25.000","change":"-0.400","changePct":"-1.575%","high":"25.220","low":"24.940","turnover":"2.033B","ccy":"HKD"},{"code":"09618","tcName":"京東集團－ＳＷ","nominal":"340.000","change":"+17.000","changePct":"+5.263%","high":"345.000","low":"336.200","turnover":"1.762B","ccy":"HKD"},{"code":"02828","tcName":"恒生中國企業","nominal":"90.040","change":"-1.560","changePct":"-1.703%","high":"90.980","low":"89.940","turnover":"1.505B","ccy":"HKD"},{"code":"01211","tcName":"比亞迪股份","nominal":"300.200","change":"-2.600","changePct":"-0.859%","high":"304.400","low":"296.200","turnover":"1.203B","ccy":"HKD"},{"code":"01024","tcName":"快手－Ｗ","nominal":"94.650","change":"-3.800","changePct":"-3.860%","high":"96.550","low":"92.050","turnover":"1.201B","ccy":"HKD"},{"code":"05085","tcName":"WHARFREIC N2801","nominal":"","change":"0.000","changePct":"0.000%","high":"","low":"","turnover":"120.698M","ccy":"USD"},{"code":"03800","tcName":"保利協鑫能源","nominal":"3.450","change":"+0.070","changePct":"+2.071%","high":"3.490","low":"3.340","turnover":"669.772M","ccy":"HKD"},{"code":"40744","tcName":"CK PPT FN N2406","nominal":"","change":"0.000","changePct":"0.000%","high":"","low":"","turnover":"78.820M","ccy":"USD"},{"code":"00388","tcName":"香港交易所","nominal":"461.000","change":"-3.800","changePct":"-0.818%","high":"464.000","low":"460.200","turnover":"560.681M","ccy":"HKD"},{"code":"02318","tcName":"中國平安","nominal":"56.450","change":"-1.050","changePct":"-1.826%","high":"57.500","low":"56.350","turnover":"560.451M","ccy":"HKD"},{"code":"01299","tcName":"友邦保險","nominal":"83.950","change":"-1.000","changePct":"-1.177%","high":"84.600","low":"83.600","turnover":"531.678M","ccy":"HKD"},{"code":"00175","tcName":"吉利汽車","nominal":"25.600","change":"-0.700","changePct":"-2.662%","high":"26.100","low":"25.500","turnover":"489.987M","ccy":"HKD"},{"code":"00136","tcName":"恒騰網絡","nominal":"2.230","change":"+0.120","changePct":"+5.687%","high":"2.300","low":"2.060","turnover":"481.904M","ccy":"HKD"},{"code":"02020","tcName":"安踏體育","nominal":"135.700","change":"+0.200","changePct":"+0.148%","high":"136.800","low":"134.000","turnover":"465.560M","ccy":"HKD"},{"code":"02382","tcName":"舜宇光學科技","nominal":"216.600","change":"+0.400","changePct":"+0.185%","high":"220.000","low":"213.000","turnover":"457.690M","ccy":"HKD"},{"code":"00939","tcName":"建設銀行","nominal":"5.180","change":"-0.040","changePct":"-0.766%","high":"5.250","low":"5.180","turnover":"432.452M","ccy":"HKD"}]}
