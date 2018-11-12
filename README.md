# XML_Compare

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
