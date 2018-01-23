import * as Service from "../service";
import * as Types from "../muation-types";
import {Toast,Dialog} from "vant";
import * as Util from "../../util";
import axios from "axios";

const AJAX_ERROR_TEXT = "请求出错，请稍后重试";
const Message = {
    loading(){
        Toast.loading({
            duration : 0,
            forbidClick: true
        })
    },
    closeLoading(){
        Toast.clear();
    },
    alert(content,title){
        return Dialog.alert({
            title : title || "提示",
            message : content
        })
    } 
};

//初始化时载入数据
export async function initLoadData({commit,state,dispatch},{aid,pid}){
    Message.loading();
    const infoRes = await Service.getBookInfo({aid,pid});
    const infoData = infoRes.data;
    if(!infoRes && infoRes.code!=200){
        Message.closeLoading();
        return Message.alert(infoRes.msg || AJAX_ERROR_TEXT);
    }
    let tickets = infoRes.data.tickets;
    if(!infoRes && infoRes.code!=200){
        Message.closeLoading();
        return Message.alert("暂无可预订的票类");
    }
    const pids = tickets.map(item=>item.pid).join(",");
    const tids = tickets.map(item=>item.tid).join(",");
    const startDate = infoRes.data.startDate;
    const nextDate = Util.nextDay(startDate);

    const priceStoreRes = await axios.all([
        Service.getPriceAndStorage({pids,tids,aid,date:startDate}),
        Service.getPriceAndStorage({pids,tids,aid,date:nextDate})
    ]);
    const firstRes = priceStoreRes[0];
    const nextRes = priceStoreRes[1];
    let storePrice = {};
    storePrice[startDate] = firstRes.data || {};
    storePrice[nextDate] = nextRes.data || {};

    //票类列表注入count字段，用来表示用户所购买的票数
    //票类列表注入storage字段,用来表示该张票某天的库存
    let ticketList = tickets.map((item,index)=>{
        const buy_low = item.buy_low*1;
        let count = buy_low;
        if(index==0){
            if(buy_low==0){
                count = 1;
            }
        }else{
            count = 0;
        }
        return {...item,count:count,storage:-1};
    });



    Message.closeLoading();

    if(!firstRes || firstRes.code!=200){
        return Message.alert(infoRes.msg || AJAX_ERROR_TEXT);
    }

    const newBookInfo = {};
    for(var i in infoData){
        if(i!=="tickets") newBookInfo[i] = infoData[i];
    }
    newBookInfo["nextDate"] = nextDate;


    commit(Types.PAGE_READY,{
        ticketList : ticketList,
        bookInfo : newBookInfo,
        storePrice
    })


}

/**
 * 切换游玩日期时
 */
export async function switchPlayDate({commit,state,dispatch},{date}){
    let priceStore = state.storePrice[date];
    const ticketList = state.ticketList;
    if(!priceStore){//不在缓存里，发ajax

    }else if(Util.isEmpty(priceStore)){ //缓存里当天的价格库存是个空{},表示当天没有设置库存价格

    }else{ //走缓存
        
    }
    //重要逻辑：用得到的新库存storage,新价格price来更新ticketList
    const newTicketList = ticketList.map((item,index)=>{
        const pid = item.pid;
        const buy_low = item.buy_low;
        const buy_up = item.buy_up;
        const count = item.count;
        let storage,price,newCount;
        if(!priceStore[pid]){
            storage = 0;
            price = 0;
        }else{
            storage = priceStore[pid].store;
            price = priceStore[pid].price;
        }
        if(storage==0){
            newCount = 0;
        }else if(storage!=-1){
            
        }
    })
}
