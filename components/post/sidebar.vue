<template>
  <div class="conent" @mouseleave="clearActive">
    <div
      class="hotcity"
      ref="hotcity"
      v-for="(item,index) in cityList"
      :key="index"
      @mouseover="toActive(index)"
    >
      <span>{{item.type}}</span>
      <span class="el-icon-arrow-right"></span>
      <div class="one_city" ref="one_city">
        <div class="citylist" v-for="(item,index) in item.children" :key="index">
          <span>{{index+1}}</span>
          {{item.city}}
          <em>{{item.desc}}</em>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cityList: []
    };
  },
  mounted() {
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      this.cityList = res.data.data;
    });
  },
  methods: {
    toActive(index) {
      this.$refs.hotcity.forEach((e, i) => {
        if (i == index) {
          e.classList.add("orange");
        } else {
          e.classList.remove("orange");
        }
      });
      this.$refs.hotcity.forEach((e, i) => {
        if (i == index) {
          e.style = "border-right:1px solid #fff";
        } else {
          e.style = "border-right:1px solid #bbb";
        }
      });
      this.$refs.one_city.forEach((e, i) => {
        e.style =
          i == index
            ? e.classList.add("display")
            : e.classList.remove("display");
      });
    },
    clearActive(index) {
      this.$refs.hotcity.forEach(e => {
        e.classList.remove("orange");
      });
      this.$refs.hotcity.forEach(e => {
        e.style = "border-right:1px solid #bbb";
      });
      this.$refs.one_city.forEach(e => {
        e.classList.remove("display");
      });
    }
  }
};
</script>

<style lang="less" scoped>
.orange{
    color: orange;
}
.display{
    display: block !important;
}
.conent{
    position: relative;
}
.hotcity{
    font-size: 14px;
    border-right: 1px solid #bbb;
    border-left: 1px solid #bbb;
    border-top: 1px solid #bbb;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    &:last-child{
        border-bottom: 1px solid #bbb;
    }
}
.one_city{
    background-color: #fff;
    z-index: -1;
    box-sizing: border-box;
    padding: 20px 20px;
    position: absolute;
    right: -349px;
    top: 0;
    border: 1px solid #bbb;
    // border-left: 0;
    width: 350px;
    height: 200px;
    display: none;
    .citylist{
        height: 40px;
    }
}
</style>