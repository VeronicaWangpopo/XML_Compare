var XML = require('./xmlModal'),
    loggerObj = require('./winstonLog');
    


exports.logTest = function(request, response) {
    var logger = new loggerObj("C:/gateway/XML_Compare/log/部門_研發二部/");
    // var logger = new loggerObj('//fs3/部門_研發二部/Veronica/xml_compare/');
    
    logger.log('info','test')
    logger.log('info','test1')
    logger.log('info','test2')
    logger.log('info','tes3')
    response.end('');
}

exports.compare = function (request, response) {
    var logger = new loggerObj('//fs3/部門_研發二部/Veronica/xml_compare/');
    var url_a = request.param('a');
    var url_b = request.param('b');

    logger.log("info", "Start Time: " + new Date().toLocaleString())
    logger.log("info", "New Version URL: " + url_a)
    logger.log("info", "Old Version URL: " + url_b)

    var p1 = new Promise(function(resolve, reject) {
        setTimeout(function() {
        
            XML.xmlToJson(url_a,false, function (err, data) {
                if (err) {
                    response.send(err);
                }
                resolve(processJSON(JSON.stringify(data, null, 2)));
            })  ;
        }, 3000);
    });

    var p2 = new Promise(function(resolve, reject) {
        setTimeout(function() {
        
            XML.xmlToJson(url_b,true, function (err, data) {
                if (err) {
                    response.send(err);
                }
                resolve(processJSON(JSON.stringify(data, null, 2)));
                // resolve(JSON.stringify(data, null, 2));
            });
        }, 10000);
    });

    // p1.then(function(value) {
        // console.log("get p1 OK");
        // response.end(value)
    // });

    // p2.then(function(value) {
    //     console.log(value);
    //     response.end(value)
    // });

    Promise.all([p1,p2]).then(function(values) {
        var obj1 = values[0]
        var obj2 = values[1]
        
        logger.log("info", "Compare Start")

        Object.keys(obj1).map(function(idKey, index) {
            var flag = checkJson(obj1[idKey], obj2[idKey], logger);
            if (flag) delete obj2[idKey]
        });
        
        //eliminate all the null values from the data
        obj2 = obj2.filter(function(x) { return x !== null }); 
        logger.log("info", "Compare Done")

        // 判斷status code
        // 若比對有不一樣的地方 回傳500 / 完全一致 回傳200
        if (obj2.length > 0) response.status(500)
        
        logger.log("info", "End Time: " + new Date().toLocaleString())
        response.end(JSON.stringify(obj2, null, 2))
    })
    
}

// 比對JSON資料
function checkJson(j1, j2, logger) {
    var flag = true;
    Object.keys(j1).map(function(key, index) {

        if (j1[key] !== j2[key]) {
            logger.log("warn", "BankFundID:" + j1.ASPFundID + ", key:" + key  + ", new: " +  + j1[key] + ", old:" + j2[key]);
            flag = false
        }
    });

    return flag;
}

// 整理JSON
function processJSON(json) {
    var result = JSON.parse(json).Result.Data[0].Row,
        obj = [];

    for (var index in result) {
        var data = result[index].$
        // obj[data.ASPFundID] = 
        // {
        //     "ID": data.ID,
        //     "Name": data,Name,
        //     "ASPFundID": data.ASPFundID,
        //     "V1": data.V1,
        //     "V2": data.V2,
        //     "V3": data.V3,
        // }

        obj[data.ASPFundID] = {}
        

        Object.keys(data).map(function(objectKey, index) {
            var value = data[objectKey];
            obj[data.ASPFundID][objectKey] = value;
        });
    }

    return obj
}

exports.readFile = function (request, response) {
    var url = request.param('url');
    // var url = "http://210.66.210.214/djmda/api/djmda?x=9997&a=0180sec&b=1&c=4,5,63"

    XML.xmlToJson(url, function (err, data) {

        if (err) {
            response.send(err);
        }

        response.end(JSON.stringify(data, null, 2));
    });
}