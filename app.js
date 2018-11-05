const xmlObject = require('./xmlObject');
const new_XML = new xmlObject();

var url = "http://210.66.210.214/djmda/api/djmda?x=9997&a=0180sec&b=1&c=4,5,63"
console.log(new_XML.roadXML(url));

