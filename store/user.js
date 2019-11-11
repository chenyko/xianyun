export const state = () => ({
    // 采用接口返回的数据结构
    userInfo: {
        token: "",
        user: {},
    },
}) 

// 同步存储数据
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

// 异步存储数据
export const actions={
    login(store,data){
     return   this.$axios({
            url:"/accounts/login",
            method:'post',
            data
        }).then(res=>{
        //    console.log(res.data);
           
          store.commit('setUserInpo',res.data)
        })
    },
    sendCaptcha(store,tel){
       return this.$axios({
            url: `/captchas`,
            method: "POST",
            data: {
                tel
            }
        }).then(res => {
            const {code} = res.data;
            return code;
        })
    }
}