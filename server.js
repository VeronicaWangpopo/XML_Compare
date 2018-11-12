var express = require('express'),
    xmlModel = require('./api/xmlController'),
    app = express();


app.listen(3000, function () {
    console.log('Listening on port 3000');
});

app
    .get('/readFile', xmlModel.readFile)
    .get('/compare', xmlModel.compare)
    .get('/log', xmlModel.logTest)

// var port = process.env.PORT || 8080;
// app.listen(port);

// app
//     .get('/api/users', function (req, res) {
//         console.log('test');
//         var user_id = req.param('id');
//         var token = req.param('token');
//         var geo = req.param('geo');

//         res.send(user_id + ' ' + token + ' ' + geo);
//     });
