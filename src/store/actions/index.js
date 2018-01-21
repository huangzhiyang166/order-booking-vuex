import * as Service from "../service";
import * as Types from "./types";
import {Toast,Dialog} from "vant";
const AJAX_ERROR_TEXT = "请求出错，请稍后重试";
const Alert = (content,title) => Dialog.alert({
    title : title || "提示",
    message : content
});
const Message = {
    loading(){
        Toast.loading({
            duration : 0,
            forbidClick: true
        })
    },
    closeLoading(){
        Toast.clear();
    }
};

//页面初始化时载入数据
export async function initLoadData({commit,state,dispatch},payload){
    const {lid} = payload;
    const landRes = await Service.getLandInfo({lid});
    if(!landRes) return commit(Types.PAGE_READY);
    if(landRes.code!==200){
        Alert(landRes.msg);
        return commit(Types.PAGE_READY);
    }
    const roundList = landRes.data.show_round_list;
    const ticketListRes = await Service.getTicketList({lid});
    if(!ticketListRes) return commit(Types.PAGE_READY);
    if(ticketListRes.code!==200){
        Alert(ticketListRes.msg);
        return commit(Types.PAGE_READY);
    }
    let ticketList = ticketListRes.data.list || [];
    let aids = ticketList.map(item=>item.aid);
    let pids = ticketList.map(item=>item.pid);
    let zoneIDs = ticketList.map(item=>item.zone_id);

    //如果后端返回的startDate那天没有场次，则ticketList里的storage为0
    if(landRes.data.show_round_list && landRes.data.show_round_list.length>0){ //有场次
        const storageRes = await Service.getStorage({
            venueID : landRes.data.venue_id,
            roundID : roundList[0].round_id,
            aids : aids,
            pids : pids,
            zoneIDs : zoneIDs
        })
        if(!storageRes || storageRes.code!==200){
            Alert(storageRes.msg || AJAX_ERROR_TEXT);
            return commit(Types.PAGE_READY);
        }else{
            ticketList.forEach((item,index)=>{
                const aid = item.aid;
                const pid = item.pid;
                const storageList = storageRes.data || [];
                const storageItem = storageList.find(item=> (item.aid==aid && item.pid==pid));
                if(storageItem){
                    item["storage"] = storageItem.storage;
                }else{
                    item["storage"] = 0;
                }
            })
        }
    }else{
        ticketList.forEach(item=>item["storage"] = 0)
    }
    commit(Types.PAGE_READY,{
        landData : landRes.data,
        ticketListData : ticketList
    })
    
    
}

/**
 * 切换游玩日期时，分3步：
 * 1、先获取场次
 * 2、根据场次的第一场获取库存
 * 3、获取价格(待定)
 */
export async function switchPlayDate({commit,state,dispatch},{date}){
    const venueID = state.landInfo.venue_id;
    const ticketList = state.ticketList;
    Message.loading();
    const changciRes = await Service.getChangciList({venueID,date});
    const changciList = changciRes.data || [];
    const firstRoundID = changciList[0] ? changciList[0].round_id : "";
    commit(Types.SWITCH_CHANGCI_LIST,{changciList:changciList});
    Message.closeLoading();
    if(!changciRes || changciRes.code!==200){
        return Alert(changciRes.msg || AJAX_ERROR_TEXT);
    }
    //如果当天有场次，则接下去请求第一个场次的库存
    if(firstRoundID){
        dispatch("switchChangci",{changciID:firstRoundID})
    }
}


/**
 * 切换场次
 */
export async function switchChangci({commit,state,dispatch},{changciID}){
    //请求该场次下库存
    const venueID = state.landInfo.venue_id;
    const {aids,pids,zoneIDs} = state;
    Message.loading();
    const storageRes = await Service.getStorage({
        venueID : venueID,
        roundID : changciID,
        aids : aids,
        pids : pids,
        zoneIDs : zoneIDs
    });
    Message.closeLoading();
    const storageList = storageRes.data || [];
    if(!storageRes || storageRes.code!=200){
        Alert(storageRes.msg || AJAX_ERROR_TEXT);
    }
    commit(Types.SWITCH_CHANGCI,{changciID,storageList});
}