export const state = () => ({
    // 采用接口返回的数据结构
    userInfo: {
        token: "",
        user: {},
    },
}) 


export const mutations={
    setUserInpo(state,data){
        state.userInfo=data
    }
}