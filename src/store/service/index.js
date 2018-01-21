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