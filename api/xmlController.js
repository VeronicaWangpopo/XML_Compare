var XML = require('./xmlModal');

exports.compare = function (request, response) {
    var url_a = request.param('a');
    var json_a = "";

    XML.xmlToJson(url_a, function (err, data) {
        if (err) {
            response.send(err);
        }
        response.end(JSON.stringify(data, null, 2));
    });
    // response.end(json_a)
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