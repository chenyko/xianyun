// 存储状态
export const state = () => {
  return {
    hotelData:{
        total:0,
        nextStart:10,
        data: [
        //     hotellevel: {
        //       level: 0
        //       // arr:[]
        //     },
        //     hoteltype: {},
        //     stars: 0,
        //     products: []
          ]
    }
  }
}
export const mutations = {
  setHotelData(state, data) {
    state.hotelData = data
    console.log(state.hotelData);
    
  }
}
export const actions = {
  getHotels(store,params) {
    return this.$axios({
      url: "/hotels",
      params,
    }).then(res => {
      console.log(res.data);
      store.commit('setHotelData',res.data)
      return res.data.data
    });
  }
}
