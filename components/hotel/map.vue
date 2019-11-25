<template>
  <div id="container"></div>
</template>

<script>
// import { async } from "q";
export default {
  data() {
    return {
      hotel: [
        {
          location: {},
          name: ""
        }
      ]
      //   locationInfos: []
    };
  },
  methods: {
    //   获取酒店的经纬度
    getLocationInfo() {
      let locations = [];
      let names = [];
      let address = [];
      this.hotel.forEach(async e => {
        locations.push(e.location);
        names.push(e.name);
        address.push(e.address);
        await locations.forEach((e, i) => {
          e.name = names[i];
          e.address = address[i];
        });
      });

      //   遍历位置集合，将名称加进每一个对象
      //   this.locationInfos = [...locations,...names]
      console.log(locations);
      return locations;
    },
    setMap(locationsArr) {
      window.onLoad = function() {
        var map = new AMap.Map("container", {
          zoom: 11, //级别
          center: [118.778074408,32.0572355018], //中心点坐标
          viewMode: "3D" //使用3D视图
        });
        var markerList = [];
       
        locationsArr.forEach((e, i) => {
          //   添加点标记

          var marker = new AMap.Marker({
            icon:  "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",          
            zooms:[3,20],
            opacity:1,
            text: {
              content: i + 1
            },
            position: new AMap.LngLat(e.longitude, e.latitude),
            title: e.name
          });
          markerList.push(marker);
        });
        map.add(markerList);
        // markerList.on("click", onMarkerClick); //绑定click事件
      };
      var url =
        "https://webapi.amap.com/maps?v=1.4.15&key=ab8f1dc8b46c4f6dad9b52ef47bddc1f&callback=onLoad";
      var jsapi = document.createElement("script");
      jsapi.charset = "utf-8";
      jsapi.src = url;
      document.head.appendChild(jsapi);
    }
  },
  mounted() {
    setTimeout(async () => {
      // 从store中获取酒店数据，调用地图，将经纬度当成参数传进去
      this.hotel = await this.$store.dispatch("hotel/getHotels");
      console.log(this.hotel);
      this.setMap(this.getLocationInfo());
    }, 1);
  }
};
</script>

<style>
#container {
  /* width: 300px; */
  height: 300px;
}
</style>