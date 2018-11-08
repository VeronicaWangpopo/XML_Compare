var https = require('https'),
    Http = require('http'),
    parseString = require('xml2js').parseString,
    iconv = require('iconv-lite'),
    BufferHelper = require('bufferhelper')

exports.xmlToJson = function (url,isBig, callback) {
    var req = Http.get(url, function (res) {

        var bufferhelper = new BufferHelper();
        

        res.on('data', function (chunk) {
            bufferhelper.concat(chunk)
        });

        res.on('error', function (e) {
            callback(e, null);
        });

        res.on('timeout', function (e) {
            callback(e, null);
        });

        res.on('end', function () {
            parseString(
                iconv.decode(bufferhelper.toBuffer(), isBig? 'Big5': 'UTF-8'), function (err, result) {
                callback(null, result);
            });
        });
    });
}
