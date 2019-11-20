<template>
  <div>
    <div class="video" v-if="data.images.length ==2">
      <div class="middleImg">
        <img :src="data.images[0]" alt />
        <div @click="jumpPostDeail" class="box">
          <span class="iconfont iconshipin"></span>
        </div>
      </div>
      <div>
        <div class="top">
          <div class="title" @click="jumpPostDeail">{{data.title}}</div>
        </div>
        <div class="summary" v-html="data.summary" @click="jumpPostDeail"></div>
        <div class="bottom">
          <!-- 跟帖部分 -->
          <div>
            <i class="el-icon-location-outline"></i>
            <span>{{data.cityName}}</span>
            <span>by</span>
            <img class="img2" :src="$axios.defaults.baseURL + data.account.defaultAvatar" alt />
            <span>{{data.account.nickname}}</span>
            <i class="el-icon-view"></i>
            <span>{{data.watch}}</span>
          </div>
          <div>{{data.like}}赞</div>
        </div>
      </div>
    </div>
    <div class="one" v-else-if="data.images.length >=0 && data.images.length <3">
      <div class="right">
        <img @click="jumpPostDeail" :src="data.images[0]" alt />
      </div>
      <div class="left">
        <div @click="jumpPostDeail" class="title">{{data.title}}</div>
        <div class="summary" @click="jumpPostDeail" v-html="data.summary" ></div>
        <span class="dantiaoData">
          <div>
            <i class="el-icon-location-outline"></i>
            <span>{{data.cityName}}</span>
            <span>by</span>
            <img class="img2" :src="$axios.defaults.baseURL + data.account.defaultAvatar" alt />
            <span>{{data.account.nickname}}</span>
            <i class="el-icon-view"></i>
            <span>{{data.watch}}</span>
          </div>
          <div style="color:orange;font-size:16px">{{data.like}} 赞</div>
        </span>
      </div>
    </div>
    <div class="three" v-else-if="data.images.length >=3">
      <div class="top">
        <div @click="jumpPostDeail" class="title">{{data.title}}</div>
      </div>
      <div class="summary" v-html="data.summary"  @click="jumpPostDeail"></div>
      <div @click="jumpPostDeail" class="middleImg">
        <img :src="data.images[0]" alt />
        <img :src="data.images[1]" alt />
        <img :src="data.images[2]" alt />
      </div>
      <div class="bottom">
        <div>
          <i class="el-icon-location-outline"></i>
          <span>{{data.cityName}}</span>
          <span>by</span>
          <img class="img2" :src="$axios.defaults.baseURL + data.account.defaultAvatar" alt />
          <span>{{data.account.nickname}}</span>
          <i class="el-icon-view"></i>
          <span>{{data.watch}}</span>
        </div>
        <div style="color:orange;font-size:16px">{{data.like}} 赞 </div>
      </div>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {
        images: [],
      }
    }
  },
  methods: {
    jumpPostDeail() {
    // console.log(this.data.id);
      this.$router.push('/post/postItem'+'?id='+this.data.id);
    }
  }
};
</script>

<style scoped lang="less">
.dantiaoData {
  display: flex;
  justify-content: space-between;
}
.img2 {
  position: relative;
  top: 2px;
  height: 15px;
  width: 15px;
}
.summary {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; 
  overflow: hidden;
  margin-bottom: 15px;
  color: #666;
  &:hover {
    cursor: pointer;
  }
}
.one {
  display: flex;
  justify-content: space-between;
  padding: 10.001px;
  font-size: 14px;
  border-bottom: 1px solid #eee;
  .left {
    margin-right: 15.001px;
    margin-left: 8px;
    .title {
      margin-bottom: 15.002px;
      font-size: 18px;
      &:hover {
        cursor: pointer;
        color: orange;
      }
    }
    span {
      font-size: 11.999px;
      color: #888;
    }
  }
  .right {
    img {
      object-fit: cover;
      height: 150px;
      width: 220px;
      &:hover {
        cursor: pointer;
      }
    }
  }
}

.three {
  padding: 10.001px;
  font-size: 14px;
  border-bottom: 1px solid #eee;
  .top {
    .title {
      margin-bottom: 15.002px;
      font-size: 18px;
      &:hover {
        cursor: pointer;
        color: orange;
      }
    }
  }
  .middleImg {
    display: flex;
    justify-content: space-between;
    align-items: center;
    object-fit: cover;
    img {
      height: 150px;
      width: 220px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    span {
      font-size: 11.999px;
      color: #888;
    }
  }
}
.video {
  padding: 10.001px;
  font-size: 14px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  .top {
    .title {
      margin-bottom: 15.002px;
      font-size: 18px;
      &:hover {
        cursor: pointer;
        color: orange;
      }
    }
  }
  .middleImg {
    position: relative;
    img {
      height: 150px;
      width: 220px;
      &:hover {
        cursor: pointer;
      }
    }
    .box {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        width: 46.001px;
        height: 46.001px;
        border-radius: 23px;
        background-color: rgba(255, 255, 255, 0.3);
        text-align: center;
        line-height: 46.001px;
        font-size: 40px;
        color: #fff;
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    span {
      font-size: 11.999px;
      color: #888;
    }
  }
}
</style>