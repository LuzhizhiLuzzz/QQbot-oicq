const WebSocket = require('ws')

const ws = new WebSocket("wss://socket.nicemoe.cn")
console.log(ws.readyState);
ws.onopen = function(){
    console.log("ws连接状态" + ws.readyState);
}
ws.onmessage = function(data){
    console.log("收到来自服务器的信息", data);
}
