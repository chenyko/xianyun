export const state=()=>{
    return{
        // 历史搜索记录
        history:[]
    }
   
}
export const mutations ={
    setHistory(state,data){
        state.history.unshift(data)
    }
}