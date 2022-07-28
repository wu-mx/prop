const axios = require('axios')
console.log('System start.')
function _response(res,code,data){
    res.status(code)
    res.send(data);
    res.end();
};
module.exports = ( function (request, response) {
        let reqUrl = request.query.url;
        axios.get(reqUrl).then(function (res) {
            _response(response,200,res.data);
        }
        ).catch(function (err) {
            _response(response,500,err);
        })
    });