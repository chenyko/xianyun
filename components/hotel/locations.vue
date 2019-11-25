<template>
  <el-row class="location">
    <el-col :span="14" class="briefinfos">
      <div class="grid-content">
        <el-row type="flex" class="row-bg">
          <el-col :span="3">
            <div class="grid-content">区域：</div>
          </el-col>
          <el-col :span="21">
            <div class="grid-content">
              <router-link
                class="scenics"
                v-for="(item,index) in cityData[0].scenics"
                :key="index"
                to
              >{{item.name}}</router-link>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="3">
            <div class="grid-content">攻略：</div>
          </el-col>
          <el-col :span="21">
            <div
              class="grid-content"
            >北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</div>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="3">
            <div class="grid-content">
              均价:
              <el-tooltip class="item" effect="dark" content="等级评定是针对房价，设施和服务等各方面水平的综合评估" placement="top-start">
                <sup class="questionMark">?</sup>
              </el-tooltip>
            </div>
          </el-col>
          <el-col :span="21">
            <div class="grid-content">
              <el-row>
                <el-col :span="8">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
                    placement="bottom-start"
                    :visible-arrow="false"
                  >
                    <div>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      <span class="price-budget">￥332</span>
                    </div>
                  </el-tooltip>
                </el-col>
                <el-col :span="8">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
                    placement="bottom"
                    :visible-arrow="false"
                  >
                    <div>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      <span class="price-budget">¥521</span>
                    </div>
                  </el-tooltip>
                </el-col>
                <el-col :span="8">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
                    placement="bottom"
                    :visible-arrow="false"
                  >
                    <div>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      <span class="price-budget">¥768</span>
                    </div>
                  </el-tooltip>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-col>
    <el-col :span="10">
      <Map />
    </el-col>
  </el-row>
</template>

<script>
import Map from "@/components/hotel/map";
export default {
  components: {
    Map
  },
  props: {
    cityData: {
      type: Array,
      default: [
        {
          post: {},
          scenics: []
        }
      ]
    }
  }
};
</script>

<style scoped lang="less">
.location {
  margin-bottom: 20px;
  .briefinfos {
    padding-right: 10px;
    color: #666;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 5px 0;
    font-size: 14px;
  }
  // .map {
  //   height: 300px;
  //   background-color: pink;
  // }
  .scenics {
    margin-right: 15px;
    color: inherit;
    &:hover {
      color: skyblue;
      text-decoration: underline;
    }
  }
  .iconhuangguan {
    color: #f90 !important;
  }
  .questionMark{
    background-color: #ccc;
    color:#fff;
    display: inline-block;
    width:16px;
    height:16px;
    text-align: center;
    border-radius:50%;
  }
}
</style>