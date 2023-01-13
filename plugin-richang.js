"use strict"

const { segment } = require("oicq")
const { bot } = require("./index")

const url =`https://www.jx3api.com/data/active/current?server=${"梦江南"}&num=${0}`
// 日常
async function getRC(server="梦江南", num=0){
    let rc;
    const res = await fetch(`https://www.jx3api.com/data/active/current?server=${server}&num=${num}`);
    res.then(r => {return r.json()}).then(v=>{rc = v});
    return rc;
}

bot.on("message.group", async function (msg) {
	if (msg.raw_message === "日常")
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
                const {date,week,war,battle,camp,prestige,school,relief,team} = JSON.parse(data).data;
                const s = 
                "今天是" + date + " 星期" + week +
                "\n秘境日常：" + war +
                "\n阵营日常：" + camp +
                "\n战场      ：" + battle + 
                "\n驰援任务：" + school +
                "\n家园声望道具：" + prestige[0] + "," + prestige[1] + ","+prestige[2] +
                "\n公共周常：" + team[0] +
                "\n五人周常：" + team[1] +
                "\n十人周常：" + team[2]
                msg.group.sendMsg(s); 
            });
     
        }).on("error", (error) => {
            console.log("Error: " + error.message);
            msg.reply([segment.at(msg.sender.user_id),"日常获取失败"],true);
        });
    }

})

