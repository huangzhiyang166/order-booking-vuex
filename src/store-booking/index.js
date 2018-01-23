import Vue from "vue";
import Vuex from "vuex";
import * as actions from "./actions";
import * as Types from "./muation-types";
import {Toast,Dialog} from "vant";
const AJAX_ERROR_TEXT = "请求出错，请稍后重试";
Vue.use(Vuex);
export default new Vuex.Store({
    state : {
        pageReady : false,
        ticketList : [],
        bookInfo : {},
        storePrice : {},
        aid : "",
        pid : "",
        curBeginDate : ""
    },
    getters : {

    },
    actions,
    mutations : {
        [Types.PAGE_READY](state,{bookInfo,ticketList,storePrice}){

            //算出startDate跟nextDate的最低价格
            const startDate = bookInfo.startDate;
            const nextDate = bookInfo.nextDate;
            const startDatePriceStore = storePrice[startDate];
            const nextDatePriceStore = storePrice[nextDate];
            let startDatePrice = [];
            let nextDatePrice = [];
            for(var i in startDatePriceStore)startDatePrice.push(startDatePriceStore[i].price * 1);
            for(var s in nextDatePriceStore) nextDatePrice.push(nextDatePriceStore[s].price * 1);

            //-1代表当天未设置价格
            const startDate_minPrice = startDatePrice.length>0 ? startDatePrice.sort((a,b) => (a-b))[0] : -1;
            const nextDate_minPrice = nextDatePrice.length>0 ? nextDatePrice.sort((a,b)=> (a-b))[0] : -1;
            bookInfo["startDate_minPrice"] = startDate_minPrice;
            bookInfo["nextDate_minPrice"] = nextDate_minPrice;

            state.pageReady = true;
            state.bookInfo = bookInfo;
            state.ticketList = ticketList;
            state.storePrice = storePrice;

            


        },
    }
})

