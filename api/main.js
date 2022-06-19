

const http = require('http')
const https = require('https')
const axios = require('axios')
const url = require('url')
const proxlist = require('./proxlist')
console.log('System start.')
function _response(res,code,data){
    res.status(code)
    res.send(data);
    res.end();
};
module.exports = ( function (request, response) {
        let reqUrl = request.query.name;
        let query = request.query.client;
        if(proxlist.index.indexOf(reqUrl) !== -1){
            let reqObj = proxlist.list[proxlist.index.indexOf(reqUrl)];
            if(query == "" || query == null){
                let proxUrl = reqObj.url;
                axios
                    .get(proxUrl)
                    .then(res => {
                        if(res.data.includes('https://hi.nullnode.workers.dev/nullnode-clashnode')){
                            _response(response,200,res.data.replace('https://hi.nullnode.workers.dev/nullnode-clashnode','https://www.prop.cf/?name=null&client=provider'));
                        }else{
                            _response(response,200,res.data)
                        }
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