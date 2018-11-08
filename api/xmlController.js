var XML = require('./xmlModal');

exports.compare = function (request, response) {
    var url_a = request.param('a');
    var url_b = request.param('b');

    var p1 = new Promise(function(resolve, reject) {
        setTimeout(function() {
        
            XML.xmlToJson(url_a,false, function (err, data) {
                if (err) {
                    response.send(err);
                }
                resolve(processJSON(JSON.stringify(data, null, 2)));
            });
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
        console.log("Start")

        var obj1 = values[0]
        var obj2 = values[1]

        
        Object.keys(obj1).map(function(idKey, index) {
            var flag = checkJson(obj1[idKey], obj2[idKey]);
            if (flag) delete obj2[idKey]
        });
        
        //eliminate all the null values from the data
        obj2 = obj2.filter(function(x) { return x !== null }); 

        console.log("done")
        
        // 1.status code: 500 2.log: timestamp.txt => //fs3
        response.end(JSON.stringify(obj2, null, 2))
    })
    
}

// 比對JSON資料
function checkJson(j1,j2) {
    var flag = true;
    Object.keys(j1).map(function(key, index) {

        if (j1[key] !== j2[key]) {
            console.log("BankFundID:" + j1.ASPFundID + ", key:" + key  + ", new: " +  + j1[key] + ", old:" + j2[key]);
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