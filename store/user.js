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
    },

    // 退出登陆，清除用户数据
    cleanUserInfo(state,info){
        console.log(process.browser);
        
        if(process.browser){
            localStorage.removeItem('userInfo'); 
        }
        state.userInfo={}
    }
}