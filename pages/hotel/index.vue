<template>
  <div id="hotel">
    <!-- 面包屑 -->
    <div class="breadCrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>酒店</el-breadcrumb-item>
        <el-breadcrumb-item>{{cityData[0].name}}酒店预订</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 筛选 -->
    <FiltersMenu />
    <Locations :cityData="cityData" />
    <ListFilter />
    <HotelList :item = "item" v-for="(item,index) in hotelList" :key="index"/>
    <div class="b_right">
      <!-- flex布局 justify属性指定end来定义子元素的排版方式 -->
      <el-row type="flex" justify="end" class="pages">
        <!-- <el-button size="mini" icon="el-icon-arrow-left" @click="btn('last')">上一页</el-button> -->
        <el-pagination
          small
          layout="prev,pager,next"
          :total="pageSum"
          prev-text="上一页"
          next-text="下一页"
          :page-size="pageSize"
          @current-change="handleCurrentChange"
        ></el-pagination>
        <!-- <el-button size="mini" @click="btn('next')">
          下一页
          <i class="el-icon-arrow-right el-icon--right"></i>
        </el-button>-->
      </el-row>
    </div>
  </div>
</template>

<script>
import FiltersMenu from "@/components/hotel/filtersMenu";
import Locations from "@/components/hotel/locations";
import ListFilter from "@/components/hotel/listFilter";
import HotelList from "@/components/hotel/hotelList";
export default {
  data() {
    return {
      cityData: [
        {
          post: {},
          scenics: []
        }
      ],
      hotelList:[

      ],
      pageNum: [1, 2, 3, 4, 5], //显示的页码
      pageSum: 0 ,//总页数
      pageSize:10   //每页显示条目个数
    };
  },
  methods: {
    getHotelList(val){
      if(!val){
        val = 1
      }
       this.$axios({
        url: "/hotels",
        params:{
          _start:(val-1)*this.pageSize,
          _limit:this.pageSize
        }
      }).then(res => {
        console.log(res.data);
        this.hotelList = res.data.data
        this.pageSum = res.data.total
      });
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // let params = {
      //   _start:(val-1)*10,
      //   _limit:10
      // };
      // // console.log(params)
      // await this.$store.dispatch('hotel/getHotels',params)

      // this.hotelList = this.$store.state.hotel.hotelData.hotelList;
      // console.log(hotelList);
      this.getHotelList(val)
    },
    btn(v) {
      if (v == "last" && this.pageNum.indexOf(1) > -1) {
        // console.log('点击了上一页');

        if (this.pageNum[0] == 1) {
          return;
        } else {
          this.pageNum.splice(4, 1);
          this.pageNum.unshift(this.pageNum[0]--);
          console.log(this.pageNum);
        }
      } else if (v == "next" && this.pageNum < this.pageSum) {
        console.log("点击了下一页");
        this.pageNum.splice(0, 1);
        this.pageNum.push(this.pageNum[4]++);
        console.log(this.pageNum);
      }
    }
  },
  components: {
    FiltersMenu,
    Locations,
    ListFilter,
    HotelList
  },
  mounted() {
    this.$axios({
      url: "/cities",
      params: {
        name: "南京"
      }
    }).then(res => {
      // console.log(res.data.data[0]);
      const { data } = res.data;
      console.log(data);
      this.cityData = data;
      // const {scenics} = res.data.data
    });
    this.getHotelList()
  }
};
</script>

<style lang="less" scoped>
#hotel {
  width: 1000px;
  margin: 0 auto;
  .breadCrumb {
    padding: 20px 0;
  }
}
.pages {
  padding: 20px 0 40px;
  .el-page {
    .number {
      color: #409eff;
    }
  }
}
</style>