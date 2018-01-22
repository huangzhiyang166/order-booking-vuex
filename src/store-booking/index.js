import Vue from "vue";
import Vuex from "vuex";
import * as actions from "./actions";
import * as Types from "./actions/types";
import {Toast,Dialog} from "vant";
const AJAX_ERROR_TEXT = "请求出错，请稍后重试";
Vue.use(Vuex);
export default new Vuex.Store({
    state : {
        pageReady : false,
        ticketList : [],
        bookInfo : {},
        aid : "",
        pid : ""
    },
    getters : {

    },
    actions,
    mutations : {
        [Types.PAGE_READY](state,payload){
            state.pageReady = true;
            if(!payload) return false;

            let landData = payload.landData;
            let changciList = landData.show_round_list;
            let ticketList = payload.ticketListData;

            state.landInfo = landData;
            state.ticketList = ticketList;
            state.curPlayDate = landData.show_start_date;
            if(changciList && changciList.length>0){
                state.curChangciID = changciList[0].round_id;
            }

            state.aids = ticketList.map(item=>item.aid).join(",");
            state.pids = ticketList.map(item=>item.pid).join(",");
            state.zoneIDs = ticketList.map(item=>item.zone_id).join(",");
            state.changciList = [...landData.show_round_list];
        },
        [Types.SWITCH_CHANGCI_LIST](state,{changciList}){
            state.changciList = [...changciList];
            if(!changciList || changciList.length==0){ //如果当天没有场次,需要ticketList里库存重置为0
                state.ticketList.forEach((item)=>{
                    const storage = item.storage;
                    if(typeof storage!=="undefined"){
                        item.storage = 0;
                    }
                })
            }
        },
        [Types.SWITCH_CHANGCI](state,{changciID,storageList}){
            state.curChangciID = changciID;
            const ticketList = state.ticketList;
            let newTicketList = [];
            ticketList.forEach((item,index)=>{
                const pid = item.pid;
                const aid = item.aid;
                const storageItem = storageList.find(item=>(item.aid==aid&&item.pid==pid)) || {};
                const storage = storageItem.storage;
                if(typeof storage!=="undefined"){
                    newTicketList.push({...item,storage:storage});
                }else{
                    newTicketList.push({...item,storage:0});
                }
            })
            state.ticketList = newTicketList;
        }
    }
})