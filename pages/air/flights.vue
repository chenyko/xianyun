<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data='cacheFlightsData' @setDataList='setDataList'/>

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item, index) in dataList" :key="index" :data="item" />
        <!-- 分页组件 -->
        <!-- size-change: 切换条数时候触发的事件 -->
        <!-- current-change：页数切换时候触发的事件 -->
        <!-- current-page: 当前页数 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total,sizes,prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 侧边栏 -->
     <FlightsAside/>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import FlightsListHead from "@/components/air/flightsListHead";
import FlightsItem from "@/components/air/flightsItem";
import FlightsFilters from '@/components/air/flightsFilters';
import FlightsAside from '@/components/air/flightsAside'

export default {
  data() {
    return {
      // 总数据，包含了 flights， info， options，flights用来渲染航班列表
      flightsData: {
        flights: [],
        info:{},
        options:{}
      },
cacheFlightsData:{
   flights: [],
        info:{},
        options:{}
},
      // 保存当前的分页要渲染的数组
      // dataList: [],
      // 分页的变量
      pageIndex: 1,
      pageSize: 5,
      total: 0,

    }
  },
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  mounted() {
    this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      console.log(res.data, 8888);
      const { data } = res;
      this.flightsData = data;
      // 当前分页渲染的列表
      // this.dataList=this.flightsData.flights.slice(0,5);
      // 数据的总条数
     // 赋值给拷贝的新数据, 这份数据一旦赋值之后不能被修改
      this.cacheFlightsData={...data}
      this.total = this.flightsData.total;
      
    });
  },
  computed: {
    dataList() {
      const arr = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
      //  console.log(arr,7777);
      
      return arr;
    }
  },
  methods: {
    // 分页切换条数时候触发
    handleSizeChange(val) {
      this.pageSize = val;
    
            // 得到当前分页要渲染的数组
            this.dataList = this.flightsData.flights.slice(
                (this.pageIndex  - 1 ) * this.pageSize,
                this.pageIndex * this.pageSize
               );
    },
    // 切换页数时候触发
    handleCurrentChange(val) {
      this.pageIndex = val;
    },
    setDataList(arr){
      this.flightsData.flights = arr;
      this.total = arr.length;
      this.pageIndex=1
      // console.log(this.flightsData.flights,6666);
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>