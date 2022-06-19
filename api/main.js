

const http = require('http')
const https = require('https')
const axios = require('axios')
const url = require('url')
const proxlist = require('./proxlist')
console.log('System start.')
function _response(res,code,data){
    res.writeHead(code, {'Content-Type': 'text/plain; charset=utf-8'});
    res.write(data);
    res.end();
};
module.exports = ( function (request, response) {
        console.log('New request.');
        let reqUrl = request.query;
        let query;
        if(request.query.includes('&')){
            query = request.query.split('&')[1]
        }else{
            query  = '';
        }
        console.log(reqUrl+query)
        if(proxlist.index.indexOf(reqUrl) !== -1){
            let reqObj = proxlist.list[proxlist.index.indexOf(reqUrl)];
            if(query == "" || query == null){
                let proxUrl = reqObj.url;
                axios
                    .get(proxUrl)
                    .then(res => {
                        _response(response,200,res.data);
                    })
                    .catch(err => {
                        console.log("Error when get response: " + err);
                        _response(response,502,'Sever error');
                    });
            }else if(reqObj.qIndex.indexOf(query) !== -1){
                let proxUrl = reqObj.query[reqObj.qIndex.indexOf(query)].url;
                axios
                    .get(proxUrl)
                    .then(res => {
                        _response(response,200,res.data);
                    })
                    .catch(err => {
                        console.log("Error when get response: " + err);
                        _response(response,502,'Sever error');
                    });
            }else{
                _response(response,404,'404 not found');
            }
        }else{
            _response(response,404,'404 not found');
        }
    }
);

// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8080/');