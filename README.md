# HK Stock API

***How to run this project:***
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
    
### Local Indices API
- Request
```http
GET /stock/local_indices
```
*** No Parameter ***

- Response

Example
    
    {"data":[{"nametc":"恒生指數","nominal":"24,887.50","change":"-432.22","changePct":"-1.71%","open":"24,934.40","high":"25,077.15","low":"24,825.43"},{"nametc":"金融分類指數","nominal":"34,076.42","change":"-255.82","changePct":"-0.75%","open":"34,190.11","high":"34,306.60","low":"34,025.91"},{"nametc":"公用事業分類指數","nominal":"49,273.42","change":"-57.33","changePct":"-0.12%","open":"49,236.79","high":"49,318.92","low":"49,116.37"},{"nametc":"地產分類指數","nominal":"30,609.19","change":"-326.89","changePct":"-1.06%","open":"30,588.69","high":"31,004.38","low":"30,292.54"},{"nametc":"工商業分類指數","nominal":"15,606.44","change":"-401.14","changePct":"-2.51%","open":"15,629.06","high":"15,748.16","low":"15,548.99"},{"nametc":"國企指數","nominal":"8,886.51","change":"-149.53","changePct":"-1.65%","open":"8,908.50","high":"8,965.56","low":"8,865.22"},{"nametc":"紅籌指數","nominal":"3,806.84","change":"-4.85","changePct":"-0.13%","open":"3,822.89","high":"3,849.00","low":"3,803.37"}],"timestamp":"202111191157"}
    
### News List Related Code
- Request
```http
GET /stock/news_list_related_code?code=700&limit=10
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `code` | `string` | *code*: stock code|
| `limit` | `string` | number of news <br>default: 100|

- Response

Example
    
    {"result":[{"newsId":"ETN311119319","headline":"《異動股》科通芯城（４００）急挫一成五，遭大行券商大額淨賣出 觀看全文","timestamp":"19/11/2021 10:39"},{"newsId":"ETN311119805","headline":"《股林淘金－林家亨》美電車退潮，阿里（０９９８８）遇沽壓 觀看全文","timestamp":"19/11/2021 09:38"},{"newsId":"ETN311119313","headline":"《異動股》京東高開半成，第三季收入按年增近兩成六勝預期","timestamp":"19/11/2021 09:23"},{"newsId":"ETN311119752","headline":"官媒：字節跳動過去半年國內廣告收入停止增長，今日頭條近虧損","timestamp":"19/11/2021 08:45"},{"newsId":"ETN31111913","headline":"《盤前攻略》隔晚中概美股普遍急挫，料港股今低開逾兩百點","timestamp":"19/11/2021 08:04"},{"newsId":"ETN311118721","headline":"《鍾之日記》內房撲水售資產，Ｂ站績遜瀉一成","timestamp":"18/11/2021 17:00"},{"newsId":"ETN31111860","headline":"《小傳日記》ＡＴＭ繼續被人㩒，魚缸繼續向下沉！","timestamp":"18/11/2021 16:41"},{"newsId":"ETN311118848","headline":"【重拳監管】市監總局印發企業境外反壟斷合規指引","timestamp":"18/11/2021 16:21"},{"newsId":"ETN311118230","headline":"《盤後部署》恒指２５２００難再壓，料明日港股反彈","timestamp":"18/11/2021 16:12"},{"newsId":"ETN311118846","headline":"【重拳監管】國務院反壟斷委專家：反壟斷局成立將提升執法權威性","timestamp":"18/11/2021 15:53"},{"newsId":"ETN311118487","headline":"《沽定等放榜》阿里京東績前雙雙急挫，監管令人好驚驚？","timestamp":"18/11/2021 14:30"},{"newsId":"ETN311118782","headline":"騰訊影業註冊資本急增至７﹒５億人幣，增幅達１４倍","timestamp":"18/11/2021 10:18"},{"newsId":"ETN31111877","headline":"《輪證高清－孫明哲》騰訊美團處近期高位，資金留意淡倉","timestamp":"18/11/2021 10:11"},{"newsId":"ETN311118280","headline":"《異動股》騰訊（００７００）跌逾３％，報４９３﹒４元","timestamp":"18/11/2021 10:11"},{"newsId":"ETN311118316","headline":"《異動股》績前阿里（９９８８）跌４％，京東（９６１８）跌３％","timestamp":"18/11/2021 09:44"},{"newsId":"ETN311118315","headline":"《異動股》匯量科技（１８６０）挫近３％，７﹒８億元售媒體業務","timestamp":"18/11/2021 09:40"},{"newsId":"ETN311118312","headline":"《異動股》百度挫７％，第三季經調整純利跌兩成七","timestamp":"18/11/2021 09:23"},{"newsId":"ETN311118753","headline":"《駐京專電》百度、騰訊等８企承諾今年內推「無差別速率」產品","timestamp":"18/11/2021 08:52"},{"newsId":"ETN311118750","headline":"【國務會議】國家政務信息化「十四五」規劃通過，加快建數字政府","timestamp":"18/11/2021 08:28"},{"newsId":"ETN31111813","headline":"《盤前攻略》隔晚美股走低，料港股低開近２００點","timestamp":"18/11/2021 08:13"},{"newsId":"ETN311118992","headline":"【大行炒Ｄ乜】五大行升網易目標，高盛降世茂集團評級至中性","timestamp":"18/11/2021 08:04"},{"newsId":"ETN311117537","headline":"騰訊今日再減持恒騰網絡７２１６萬股，套現１﹒１８億元","timestamp":"17/11/2021 17:30"},{"newsId":"ETN311117230","headline":"《盤後部署》大市成交額縮小，恒指未見上升動力","timestamp":"17/11/2021 17:00"},{"newsId":"ETN31111760","headline":"《小傳日記》阿里京東明放榜，魚缸膠著悶收場！","timestamp":"17/11/2021 16:52"},{"newsId":"ETN311117707","headline":"《輪證國度－劉嘉寳》市場情緒有所提振，恒指短線有望能延續反彈","timestamp":"17/11/2021 16:47"},{"newsId":"ETN311117867","headline":"微信小程序支付自助開通雲閃付功能上線","timestamp":"17/11/2021 14:48"},{"newsId":"ETN311117202","headline":"【興奮過度？】手遊股回吐，網易績後曾挫半成，上車機會嗎？","timestamp":"17/11/2021 14:25"},{"newsId":"ETN311117580","headline":"富蘭克林鄧普頓：相信中國政府不會貿然打壓民營企業","timestamp":"17/11/2021 12:16"},{"newsId":"ETN311117288","headline":"《大手成交》騰訊一手約６萬股非自動對盤，涉資３１１８萬元","timestamp":"17/11/2021 11:26"},{"newsId":"ETN311117781","headline":"企鵝號導流計劃被斥欺詐，騰訊叫停「黎明計劃」向Ｂ站ＵＰ主道歉","timestamp":"17/11/2021 10:10"},{"newsId":"ETN31111727","headline":"《窩輪豪情－梁業豪》好友機不可失，今天要加倍留意甚麼？","timestamp":"17/11/2021 09:34"},{"newsId":"ETN311117149","headline":"《套期保值－蕭猷華》港股氣氛好轉，恒指先望２６５００","timestamp":"17/11/2021 09:12"},{"newsId":"ETN311117805","headline":"《股林淘金－林家亨》中美會談和氣收場，港股短線應未升完","timestamp":"17/11/2021 08:49"},{"newsId":"ETN31111783","headline":"上市公司通告摘要一覽（２）","timestamp":"17/11/2021 08:45"},{"newsId":"ETN311117176","headline":"騰訊（００７００）：計劃發行約８３４萬股獎勵股份","timestamp":"17/11/2021 08:44"},{"newsId":"ETN311117992","headline":"【大行炒Ｄ乜】交銀國際升美團近一成一目標，瑞信升網易７％目標","timestamp":"17/11/2021 08:12"},{"newsId":"ETN311116426","headline":"騰訊再減持恒騰網絡（１３６）１﹒１４億股，套現約１﹒８億元","timestamp":"16/11/2021 18:57"},{"newsId":"ETN311116721","headline":"《鍾之日記》習拜首次視頻見，中美經貿著墨少","timestamp":"16/11/2021 17:00"},{"newsId":"ETN31111660","headline":"《小傳日記》中美會晤氣氛好，魚缸繼續往上掃！","timestamp":"16/11/2021 16:28"},{"newsId":"ETN311116324","headline":"《異動股》雷蛇（１３３７）飆一成三，傳公司高管以４元提私有化","timestamp":"16/11/2021 13:53"},{"newsId":"ETN311116357","headline":"《大手成交》騰訊一手約１３萬股交叉盤，涉資６７５５萬元","timestamp":"16/11/2021 13:33"},{"newsId":"ETN311116302","headline":"《異動股》騰訊升逾３％突破１００天線，報５０７﹒５元","timestamp":"16/11/2021 13:02"},{"newsId":"ETN311116784","headline":"《中國要聞》內媒引述遊戲公司人士：遊戲版號或將在近期恢復審批","timestamp":"16/11/2021 12:03"},{"newsId":"ETN311116773","headline":"騰訊《王者榮耀》１０月全球收入達３﹒２９億美元，同比增４６％","timestamp":"16/11/2021 10:38"},{"newsId":"ETN311116764","headline":"【重拳監管】官媒評Ａｐｐ自動續費：琢磨算計用戶的Ａｐｐ走不遠","timestamp":"16/11/2021 10:12"},{"newsId":"ETN311116315","headline":"《異動股》恒騰網絡倒升２％，遭騰訊減持套現約１﹒７億","timestamp":"16/11/2021 09:50"},{"newsId":"ETN31111627","headline":"《窩輪豪情－梁業豪》等待歷史波幅變化指示後市走向","timestamp":"16/11/2021 09:40"},{"newsId":"ETN311116805","headline":"《股林淘金－林家亨》大摩看淡美股，中美元首會談","timestamp":"16/11/2021 09:15"},{"newsId":"ETN311116754","headline":"【重拳監管】市監總局：網企進軍社區團購，擠壓小攤主就業空間","timestamp":"16/11/2021 09:04"},{"newsId":"ETN311116511","headline":"《報章摘要》本港報章摘要：淡馬錫暫停加注中國科企","timestamp":"16/11/2021 08:30"},{"newsId":"ETN31111613","headline":"《盤前攻略》市場靜待中美峰會結果，料港股輕微高開數十點","timestamp":"16/11/2021 08:16"},{"newsId":"ETN311115501","headline":"騰訊再減持恒騰網絡（１３６）９５００萬股，套現約１﹒７億元","timestamp":"15/11/2021 19:01"},{"newsId":"ETN311115202","headline":"【電商股業績】京東半日獲近九千萬元掃貨勝阿里，業績前點部署？","timestamp":"15/11/2021 12:49"},{"newsId":"ETN311115565","headline":"帝國科技集團（７７６）附屬的電競隊獲得比賽冠軍","timestamp":"15/11/2021 12:15"},{"newsId":"ETN311115108","headline":"《即市窩輪》恒指再求突破，留意牛５０３６１╱熊６８５００","timestamp":"15/11/2021 11:09"},{"newsId":"ETN311115287","headline":"《大手成交》騰訊一手約１０萬股交叉盤，涉資４７０１萬元","timestamp":"15/11/2021 11:08"},{"newsId":"ETN311115825","headline":"《Ａ股焦點》騰訊破冰邀請抖音等平台測試互聯互通，概念Ａ股狂飆","timestamp":"15/11/2021 10:42"},{"newsId":"ETN311115140","headline":"《大手成交》騰訊一手約７萬股交叉盤，涉資３４７４萬元","timestamp":"15/11/2021 10:31"},{"newsId":"ETN311115138","headline":"《大手成交》騰訊一手約９萬股交叉盤，涉資４２８４萬元","timestamp":"15/11/2021 10:19"},{"newsId":"ETN311115323","headline":"《異動股》騰訊股價表現硬淨現升２％，目前大戶被動接貨為主","timestamp":"15/11/2021 10:15"},{"newsId":"ETN311115322","headline":"《異動股》微盟（０２０１３）升２％，獲摩通增持８６２萬股","timestamp":"15/11/2021 10:02"},{"newsId":"ETN311115321","headline":"《異動股》友邦（１２９９）升逾２％暫為最佳表現藍籌","timestamp":"15/11/2021 10:01"},{"newsId":"ETN311115149","headline":"《套期保值－蕭猷華》港股缺乏上升催化劑，恒指仍在區間上落","timestamp":"15/11/2021 09:47"},{"newsId":"ETN311115772","headline":"騰訊創作服務平台向全網第三方平台發出測試邀請，包括抖音","timestamp":"15/11/2021 09:06"},{"newsId":"ETN31111518","headline":"《專家之言－葉尚志》市場氣氛有所回暖，資金流動性仍是關注點","timestamp":"15/11/2021 09:05"},{"newsId":"ETN311115114","headline":"《牛熊志選－陳其志》資金看好騰訊","timestamp":"15/11/2021 09:05"},{"newsId":"ETN311115770","headline":"【重拳監管】國信辦收緊數據跨境活動審查，赴港上市涉國安要申報","timestamp":"15/11/2021 08:36"},{"newsId":"ETN311115992","headline":"【大行炒Ｄ乜】兩大行升中芯評級，大華繼顯升瑞聲評級至持有","timestamp":"15/11/2021 08:19"},{"newsId":"ETN311111881","headline":"《陸言堂－陳永陸》騰訊短期或重上五百元，關注資金是否完成套現","timestamp":"12/11/2021 17:20"},{"newsId":"ETN31111264","headline":"《股市一周》內房股再現解困曙光，恒指回升但仍受制廿天線","timestamp":"12/11/2021 17:19"},{"newsId":"ETN31111260","headline":"《小傳日記》科股高開就獲利，魚缸竟然無落地！","timestamp":"12/11/2021 16:39"},{"newsId":"ETN311112842","headline":"《行業數據》報告：十月中國移動遊戲市場銷售收入環比增３﹒４％","timestamp":"12/11/2021 14:14"},{"newsId":"ETN311112297","headline":"《大手成交》騰訊一手約１４萬股交叉盤，涉資６９０５萬元","timestamp":"12/11/2021 13:08"},{"newsId":"ETN311112289","headline":"《大手成交》騰訊一手約２２萬股非自動對盤，涉資１﹒０５億元","timestamp":"12/11/2021 11:26"},{"newsId":"ETN311111503","headline":"騰訊減持恒騰網絡（１３６）４３９０萬股，套現近８６０５萬元","timestamp":"11/11/2021 18:38"},{"newsId":"ETN311111721","headline":"《鍾之日記》騰訊績差被唱淡，融資回暖內房揚","timestamp":"11/11/2021 17:00"},{"newsId":"ETN31111160","headline":"《小傳日記》騰訊季績較普通，內房升勢如泉湧，魚缸短期有得衝","timestamp":"11/11/2021 16:50"},{"newsId":"ETN311111855","headline":"江蘇銀行：與騰訊（７００）簽戰略合作協議，開展全域數字化轉型","timestamp":"11/11/2021 16:21"},{"newsId":"ETN311111000","headline":"【騰訊績後】騰訊季績遜色大行削目標，憂廣告前景惟監管陰霾漸散","timestamp":"11/11/2021 16:21"},{"newsId":"ETN311111202","headline":"【騰訊績後】三大業務成騰訊未來增長引擎，專家籲候低伺機買入！","timestamp":"11/11/2021 15:46"},{"newsId":"ETN311112627","headline":"報道指騰訊（０７００）軟銀領投的巴西貨車平台，估值晉身獨角獸","timestamp":"12/11/2021 09:02"},{"newsId":"ETN311112992","headline":"【大行炒Ｄ乜】四大行降瑞聲目標，瑞信降兗煤中煤評級至跑輸大市","timestamp":"12/11/2021 08:05"},{"newsId":"ETN311111503","headline":"騰訊減持恒騰網絡（１３６）４３９０萬股，套現近８６０５萬元","timestamp":"11/11/2021 18:38"},{"newsId":"ETN311111721","headline":"《鍾之日記》騰訊績差被唱淡，融資回暖內房揚","timestamp":"11/11/2021 17:00"},{"newsId":"ETN31111160","headline":"《小傳日記》騰訊季績較普通，內房升勢如泉湧，魚缸短期有得衝","timestamp":"11/11/2021 16:50"},{"newsId":"ETN311111855","headline":"江蘇銀行：與騰訊（７００）簽戰略合作協議，開展全域數字化轉型","timestamp":"11/11/2021 16:21"},{"newsId":"ETN311111000","headline":"【騰訊績後】騰訊季績遜色大行削目標，憂廣告前景惟監管陰霾漸散","timestamp":"11/11/2021 16:21"},{"newsId":"ETN311111202","headline":"【騰訊績後】三大業務成騰訊未來增長引擎，專家籲候低伺機買入！","timestamp":"11/11/2021 15:46"},{"newsId":"ETN311111031","headline":"【騰訊績後】高盛：騰訊業績符預期，目標７４８元維持確信買入","timestamp":"11/11/2021 15:17"},{"newsId":"ETN311111020","headline":"【騰訊績後】瑞信：騰訊第三季業績稍遜預期，降目標至６１５元","timestamp":"11/11/2021 15:08"},{"newsId":"ETN311111843","headline":"《滴滴下架》路透：滴滴擬年內重啟Ａｐｐ，已撥百億人幣應對罰款","timestamp":"11/11/2021 15:03"}],"timestamp":"19/11/2021 12:00"}

### ETNet News Content
- Request
```http
GET /stock/news_content?newsId=ETN311116302&source=etnet
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `newsId` | `string` | ETNet's news ID|
| `source` | `string` | News source: {etnet|aastock} <br>default: etnet|

- Response

Example
    
    {"newsId":"ETN311117580","headline":"富蘭克林鄧普頓：相信中國政府不會貿然打壓民營企業","content":"《經濟通通訊社１７日專訊》富蘭克林鄧普頓新興市場股票團隊首席投資官Ｍａｎｒａｊ　Ｓｅｋｈｏｎ表示，目前中國經濟增長仍十分穩健，預料未來１０至１５年，中國有可能成為全球最大的經濟體，認為中國政府重視經濟增長，不會貿然打壓民營企業。　　Ｍａｎｒａｊ　Ｓｅｋｈｏｎ指出，過去一段時間，中國出台一系列的監管措施的確令市場留意到相關風險，但需要了解政策出台背後的原因。中國是一個強勁的經濟體，城市化、消費主義高速發展，國內更多民眾進入中產階層，認為中國監管層首要目的是維持社會穩定和政權的合法性，同時確保一些受益於經濟發展而快速增長的企業，與其他較落後的企業之間的差距不會進一步擴大。　　他續指，中國政策的變化大且不確定性較多，往往在監管出台後，市場可能會過度解讀政策，對相關行業的股價造成衝擊，建議投資者如果看好中國的長遠發展前景，市場下跌反而是一個很好的入市機會建倉投資中國資產。板塊方面，中國一直強調經濟綠色轉型以及減少依賴化石燃料，認為應關注太陽能等替代能源行業的長期投資機會。（ａｃ）","timestamp":"202111191203"}
