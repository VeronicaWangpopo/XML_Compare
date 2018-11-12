var { createLogger, format, transports } = require('winston');

/*
Levels {
    error: 0, 
    warn: 1, 
    info: 2, 
    verbose: 3, 
    debug: 4, 
    silly: 5 
}
*/

module.exports = function(fPath) {

    let logger = createLogger({
        format: format.combine(
            format.splat(),
            format.simple()
        ),
        transports: [
            new transports.File({ filename: fPath + getDate() + '_file.log' })
        ],
    });

    this.log = function(levels, message) {
        console.log(message);
        logger.log(levels, message);
    }
}

// yyyymmddhhMMss
function getDate() {
    var d = new Date,
    dformat = [
                d.getFullYear(),
                d.getDate().padLeft(),
                (d.getMonth()+1).padLeft(),
                d.getHours().padLeft(),
                d.getMinutes().padLeft(),
                d.getSeconds().padLeft()
            ].join('');

    return dformat;
}

// 日期補0
Number.prototype.padLeft = function(base,chr) {
    var  len = (String(base || 10).length - String(this).length)+1;
    return len > 0? new Array(len).join(chr || '0')+this : this;
}
