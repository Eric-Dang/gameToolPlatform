const {regNewReq,getDateStr} = require('../../serviceMgr')
const fs = require("fs")

function dbQuery(clientData, response){
    try{
        let fd = fs.readFileSync(clientData.path)
        console.log("loadNewConfig", clientData.path)
        let configs = JSON.parse(fd)
        response.end(JSON.stringify({configs:configs, errorCode:'ok'}))
    }
    catch(error)
    {
        console.log("loadNewConfig error", error)
        response.end(JSON.stringify({errorCode:error}))
    }
}

module.exports = {
    init:function(){regNewReq('dbQuery', dbQuery)}
}