"use strict"
const WebSocket = require("ws")
const { segment, Group } = require("oicq")
const { bot } = require("./index")

const url =`https://www.jx3api.com/data/server/check?server=${"梦江南"}`

bot.on("message.group", async function (msg) {
    console.log(msg);
	if (msg.raw_message === "开服")
    {
        const https = require('https');
        https.get(url, (response) => {
            let data = '';
            //数据正在接收中...
            response.on('data', (chunk) => {
                data += chunk;
            });
            //数据接收完成
            response.on('end', () => {
                console.log('同步请求数据完成:',JSON.parse(data).data);
                const {zone,server,status} = JSON.parse(data).data;
                const s = 
                "区服：" + zone + "  " + server + "\n" + "状态：" +(status===1 ? "已开服" : "维护中")
                console.log(msg.group);
                msg.group.sendMsg(s); 
            });
     
        }).on("error", (error) => {
            console.log("Error: " + error.message);
            msg.reply([segment.at(msg.sender.user_id),"日常获取失败"],true);
        });
    }

})

const ws = new WebSocket("wss://socket.nicemoe.cn")
console.log(ws.readyState);
ws.onopen = function(){
    console.log("ws连接状态" + ws.readyState);
}
ws.onmessage = function(data){
    console.log("收到来自服务器的信息", data);
}

