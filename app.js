const app = require('express')();
const request = require('request');
const schedule = require('node-schedule');
var chalk = require('chalk');

var j = schedule.scheduleJob('0 */2 * * * *', async function(){
    const status = await makeRequest();
    console.log(status);
});


function makeRequest(){
    return new Promise(function (resolve, reject) {
        request.post({
            url:'https://api1.pvrcinemas.com/PVRCinemasCMS/api/content/csessions',
            form: {
                city: "Chennai", //select your city
                cid: "173",
                lat: "28.5363974",
                lng: "77.27057889999999",
                userid: "xxx", //get your user id after logged in
                date: "NA",
                av: "1",
                pt: "WEBSITE",
            }
        },function(err,httpResponse,body){
            const response = JSON.parse(body);
            let res1 = response.output.bd.length > 3 ? chalk.green('Positive') : chalk.red('Negative');
            resolve(res1);
        })
    });
}

app.listen(3000, () => {
    console.log('Listening to port ', 3000)
});