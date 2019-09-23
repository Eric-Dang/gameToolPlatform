var http = require('http');
var {getReqProcessFun, getDateStr} = require('./src/serviceMgr')
// ---
// 导入功能模块
// ---
const {init} = require("./src/localServer/modules/serverTimeSpeed")
init()

function parsingRequest(data){
    var reqInfos = data.substr(1).split('?')
    var param = reqInfos[1].split('&')
    var params = {}
    for (i = 0; i < param.length; ++i)
    {
        var ps = param[i].split('=')
        params[ps[0]] = ps[1]
    }
    console.log("parsingRequest", reqInfos[0])
    return {page:reqInfos[0], params:params}
}

var server = http.createServer(function(request, response) {
    console.log(getDateStr() + ' Received request for:' + decodeURI(request.url));
    var reqData = parsingRequest(decodeURI(request.url))
    console.log("recv http", reqData.page, reqData.params)
    var fun = getReqProcessFun(reqData.page)
    fun(reqData.params, response)
});
server.listen(999, function() {
    console.log(getDateStr() + ' Server is listening on port 999');
});