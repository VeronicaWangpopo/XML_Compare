# XML_Compare
比對XML的API Tool

## Motivation
寫一支API，透過參數傳入兩份XML進行比對。  
比對僅針對值做比對，不針對順序(包含子項目中的順序)。

```
情況一: 內容完全一致 -> 回傳 status 200

a_XML 內容如下: 
    <Data>
          <Row ID="A" V1="1" V2="2" V3="3" />
          <Row ID="B" V1="1" V2="2" V3="3" />
          <Row ID="C" V1="1" V2="2" V3="3" />
    </Data>
    
b_XML 內容如下: 
    <Data>
          <Row ID="A" V1="1" V2="2" V3="3" />
          <Row ID="B" V1="1" V2="2" V3="3" />
          <Row ID="C" V1="1" V2="2" V3="3" />
    </Data>
```

```
情況二: 大項順序不一致 -> 回傳 status 200

a_XML 內容如下: 
    <Data>
          <Row ID="A" V1="1" V2="2" V3="3" />
          <Row ID="B" V1="1" V2="2" V3="3" />
          <Row ID="C" V1="1" V2="2" V3="3" />
    </Data>
    
b_XML 內容如下: 
    <Data>
          <Row ID="A" V1="1" V2="2" V3="3" />
          <Row ID="C" V1="1" V2="2" V3="3" />
          <Row ID="B" V1="1" V2="2" V3="3" />
    </Data>
```

```
情況三: 小項順序不一致 -> 回傳 status 200

a_XML 內容如下: 
    <Data>
          <Row ID="A" V1="1" V2="2" V3="3" />
          <Row ID="B" V1="1" V2="2" V3="3" />
          <Row ID="C" V1="1" V2="2" V3="3" />
    </Data>
    
b_XML 內容如下: 
    <Data>
          <Row ID="A" V1="1" V2="2" V3="3" />
          <Row ID="C" V1="1" V2="2" V3="3" />
          <Row ID="B" V3="3" V1="1" V2="2" />
    </Data>
```

```
情況四: 大項內之小項值不一致 -> 回傳 status 500

a_XML 內容如下: 
    <Data>
          <Row ID="A" V1="1" V2="2" V3="3" />
          <Row ID="B" V1="1" V2="2" V3="3" />
          <Row ID="C" V1="1" V2="2" V3="3" />
    </Data>
    
b_XML 內容如下: 
    <Data>
          <Row ID="A" V1="1" V2="2" V3="3" />
          <Row ID="B" V1="1" V2="2" V3="3" />
          <Row ID="B" V1="1" V2="1" V3="1" />
    </Data>
```


## Usage

### 1. 啟動server  
```
node server.js 
```
打開瀏覽器輸入 localhost:3000，監看伺服器是否有啟動成功。  
若成功，會看到此訊息``Listening on port 3000``  

### 2. 使用API  

#### (A). 將XML 轉換成JSON 讀取  
 **目前有編碼的BUG，待Fixed** 
 
```
(GET) localhost:3000/readFile?url={XML網址}
```  
  
#### (B). 將兩份XML 進行比對
```
(GET) localhost:3000/compare?a={XML網址A}&b={XML網址B}  
```  
比對完成之後，若完全一致，會回傳 **status 200**  
若有不一致之處，會回傳 **status 500**  
並將比對之LOG匯出指定之處。  
