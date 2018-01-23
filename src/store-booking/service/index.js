import Mock from "mockjs";
const delay = (time) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve();
        },time)
    })
}

//获取产品详情
export async function getLandInfo({lid}){
    let res = {"code":200,"data":{"id":"68804","p_type":"H","title":"测试新发布演出产品（biao）","area":"1|35|0","address":"哈哈","jtzn":"【公共交通】<br \/>\r\n<br \/>\r\n<br \/>\r\n<br \/>\r\n【自驾线路】","jqts":"【发票说明】<br \/>\r\n<br \/>\r\n【温馨提示】<br \/>\r\n<br \/>\r\n【联系电话】","bhjq":"<p>【演出简介】<br><br><br><br><br><\/p><p>【著名导演】<br><\/p><p><br><\/p>","imgpath":"images\/defaultThum.jpg","imgpathGrp":[],"apply_did":"3385","lng_lat_pos":"0,0","tel":"","latitude":"0","longitude":"0"},"msg":""};
    res.data.venue_id = "12121";
    res.data.apply_did = "654656";
    res.data.show_start_date = "2018-01-22";
    res.data.show_round_list = [{
        'round_id' : 1033,
        'round_name' : '第一场',
        'begin_time' : '20:00',
        'end_time' : '22:00'
    },{
        'round_id' : 1232,
        'round_name' : '第二场',
        'begin_time' : '22:00',
        'end_time' : '23:00'
    }]
    
    await delay(1000);
    return Promise.resolve(res)
}

//获取票类列表
export async function getTicketList({lid}){
    let res = {"code":200,"data":{"type":"H","list":[
        {"ticket":"3","pid":"11","tid":"160917","px":"0","aid":"11","jsprice":1,"tprice":1,"tags":"","intro":[""],"zone_name":"普通区"},
        {"ticket":"2","pid":"22","tid":"160916","px":"0","aid":"22","jsprice":1,"tprice":1,"tags":"","intro":[""],"zone_name":"嘉宾区"},
        {"ticket":"1","pid":"33","tid":"160915","px":"0","aid":"33","jsprice":1,"tprice":1,"tags":"","intro":[""],"zone_name":"VIP区"}
    ]},"msg":""};
    await delay(1000);
    res.data.list.forEach((item)=>{
        item["zone_id"] = "123";
    })
    return Promise.resolve(res);
}

//获取场次列表
export async function getChangciList({venueID,date}){
    let res = {
        code : 200,
        data : [{
            'round_id' : 1033,
            'round_name' : '第一场',
            'begin_time' : '20:00',
            'end_time' : '22:00'
        },{
            'round_id' : 1232,
            'round_name' : '第二场',
            'begin_time' : '22:00',
            'end_time' : '23:00'
        }]
    }
    await delay(1000);
    return Promise.resolve(res);
}

//取库存
export async function getStorage({venueID,roundID,aids,pids,zoneIDs}){
    let res = {
        code : 200,
        data : [{
            aid : '11',
            pid : "11",
            storage : "200"
        },{
            aid : '22',
            pid : "22",
            storage : "100"
        },{
            aid : '33',
            pid : "33",
            storage : "10"
        }]
    }
    await delay(1000);
    return Promise.resolve(res);
}



export async function getBookInfo({aid,pid}){
    await delay(1000);
    const res = {
        code : 200,
        data : Mock.mock({
            alldis : 1,
            batch_check : "0",
            batch_day : "0",
            cancel_cost : [],
            needID : "2",
            needID : "2",
            p_type : "A",
            reb : "0",
            reb_type : "1",
            refund_early_time : "0",
            refund_rule : "0",
            startDate : "2018-01-23",
            title : "联票景点",
            validTime : "0",
            validType : "0",
            verifyTime : -1,
            tickets : [
                {
                    "title": "15-18年龄限制", 
                    "jsprice": 3, 
                    "tprice": 4, 
                    "pid": "172676", 
                    "tid": "175588", 
                    "aid": "3385", 
                    "buy_low": 1, 
                    "buy_up": 0
                }, 
                {
                    "title": "333", 
                    "jsprice": 2, 
                    "tprice": 2, 
                    "pid": "170172", 
                    "tid": "173084", 
                    "aid": "3385", 
                    "buy_low": 1, 
                    "buy_up": 0
                }, 
                {
                    "title": "测试联票1", 
                    "jsprice": 0.03, 
                    "tprice": 0.04, 
                    "pid": "171862", 
                    "tid": "174774", 
                    "aid": "3385", 
                    "buy_low": 1, 
                    "buy_up": 0
                }, 
                {
                    "title": "测试联票2", 
                    "jsprice": 4, 
                    "tprice": 5, 
                    "pid": "171863", 
                    "tid": "174775", 
                    "aid": "3385", 
                    "buy_low": 1, 
                    "buy_up": 0
                }, 
                {
                    "title": "所有身份证", 
                    "jsprice": 3, 
                    "tprice": 4, 
                    "pid": "172652", 
                    "tid": "175564", 
                    "aid": "3385", 
                    "buy_low": 1, 
                    "buy_up": 0
                }
            ]
        })
    }
    return Promise.resolve(res);
}

export async function getPriceAndStorage({pids,tids,aid,date}){
    const time = date=="2018-01-23" ? 1000 : 1500;
    await delay(time);
    const res = {
        "code": 200, 
        "data": {
            "170172": {
                "price": 2, 
                "store": -1
            }, 
            "171862": {
                "price": 0.02, 
                "store": -1
            }, 
            "171863": {
                "price": 3, 
                "store": -1
            }, 
            "172652": {
                "price": 2, 
                "store": -1
            }, 
            "172676": {
                "price": 2, 
                "store": -1
            }
        }, 
        "msg": ""
    }
    return Promise.resolve(res);
}