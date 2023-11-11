const moment = require('moment');
const fs = require('fs');

function info(msg) {
    if (!fs.existsSync('./logFiles'))
        fs.mkdirSync('./logFiles');
    const curentDate = moment().format('YYYY-MM-DD');
    fs.appendFileSync(`./logFiles/info-${curentDate}.txt`, `\nTimestamp: ${moment().format('YYYY-MM-DD HH:mm:ss')}. Info: ${msg}`);
}

function debug(msg) {
    if (!fs.existsSync('./logFiles'))
        fs.mkdirSync('./logFiles');
    const curentDate = moment().format('YYYY-MM-DD');
    fs.appendFileSync(`./logFiles/debug-${curentDate}.txt`, `\nTimestamp: ${moment().format('YYYY-MM-DD HH:mm:ss')}. Debug: ${msg}`);
}

function error(msg) {
    if (!fs.existsSync('./logFiles'))
        fs.mkdirSync('./logFiles');
    const curentDate = moment().format('YYYY-MM-DD');
    fs.appendFileSync(`./logFiles/error-${curentDate}.txt`, `\nTimestamp: ${moment().format('YYYY-MM-DD HH:mm:ss')}. Error: ${msg}`);
}

module.exports = {
    info,
    debug,
    error
}