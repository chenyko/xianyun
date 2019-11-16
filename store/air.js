export const state=()=>{
    return{
        // 历史搜索记录
        history:[],
        // 选中机票信息
        infoData: {
            // 防止页面报错
            seat_infos: {}
        },
        // 总价格
        allPrice: 0
    }
   
}
export const mutations ={
    setHistory(state,data){
        state.history.unshift(data)
    },
    setInfoData(state,data){
        state.infoData=data
    },
     // 修改总价格
     setAllPrice(state, price){
        state.allPrice = price;
    }
}