export const state=()=>{
    return{
        // 历史搜索记录
        history:[],
        // 选中机票信息
        infoData: {
            // 防止页面报错
            seat_infos: {}
        }
    }
   
}
export const mutations ={
    setHistory(state,data){
        state.history.unshift(data)
    },
    setInfoData(state,data){
        state.infoData=data
    }
}