<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <div class="left">
        <Sidebar />
        <h3>推荐城市</h3>
        <img class="img1" src="@/static/pic_sea.jpeg" alt />
      </div>
      <div class="right">
        <div class="right_top">
          <input type="text" class="input_txt" placeholder="请输入想去的地方，比如：'广州'" v-model="city" />
          <i class="el-icon-search search" @click="postkinds"></i>
        </div>
        <div class="sousuo">
          推荐：
          <span class="tuijian">广州</span>
          <span class="tuijian">上海</span>
          <span class="tuijian">北京</span>
        </div>
        <el-row
          style="border-bottom:1px solid #bbb;margin-bottom: 10px;"
          type="flex"
          justify="space-between"
        >
          <h3 class="gonglue" span:3>推荐攻略</h3>
          <div class="youji" span:3 @click="appendPage">
            <i class="el-icon-edit"></i>
            写游记
          </div>
        </el-row>
        <PostList :data="item" v-for="(item,index) in postList" :key="index" />

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[3,6,9,12]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-row>
  </div>
</template>

<script>
import Sidebar from "@/components/post/sidebar";
import PostList from "@/components/post/postList";
export default {
  data() {
    return {
      postList: [],
        pageSize: 3,
        pageIndex: 1,
       total: 0,
       city:'',
    };
  },
  components: {
    Sidebar,
    PostList
  },
  watch: {
    pageIndex() {
      this.getSomeData();
    },
    pageSize() {
      this.getSomeData();
    }
  },

  mounted() {
    this.getSomeData();
  },
  // 监听路由的变化，在组件被复用使用调用这个路由守卫
     beforeRouteUpdate(to, from , next){
        this.$axios({
        url: "/posts/"+'?city='+this.city,
        params: {
          _limit: this.pageSize,
          _start: (this.pageIndex - 1) * this.pageSize,
          
        }
      }).then(res => {
        console.log(res);
        this.postList = res.data.data;
        console.log(this.postList);
        this.total = res.data.total;
      });
        next();
    },
  methods: {
    handleCurrentChange(value) {
      // value为当前页
      // console.log(value);
      this.pageIndex = value;
    },
    handleSizeChange(value) {
      // value为当前页条数
      this.pageSize = value;
    },
     getSomeData() {
      this.$axios({
        url: "/posts",
        params: {
          _limit: this.pageSize,
          _start: (this.pageIndex - 1) * this.pageSize
        }
      }).then(res => {
        console.log(res);
        this.postList = res.data.data;
        console.log(this.postList);
        this.total = res.data.total;
      });
      
    },
    appendPage() {
      this.$router.push("/post/append");
    },
    postkinds(){
      console.log(this.city);
      this.$router.push("/posts/"+'?city='+this.city)
      //  this.$axios({
      //   url: "/posts/"+'?city='+this.city,
      //   params: {
      //     _limit: this.pageSize,
      //     _start: (this.pageIndex - 1) * this.pageSize,
          
      //   }
      // }).then(res => {
      //   // console.log(res);
      //   this.postList = res.data.data;
      //   console.log(this.postList);
      //   this.total = res.data.total;
      // });
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}
.left {
  position: relative;
  z-index: 2;
  width: 260px;
  height: fit-content;
  h3 {
    padding: 20px 0 10px 0;
    border-bottom: 1px solid #999;
  }
  .img1 {
    width: 100%;
    padding: 10px 0;
  }
}
.right {
  position: relative;
  width: 700px;
  .right_top {
    position: relative;
  }
  .input_txt {
    width: 100%;
    height: 40px;
    border: 3px solid orange;
    outline: 0;
  }
  .search {
    font-size: 24px;
    color: orange;
    font-weight: 700;
    position: absolute;
    right: 0;
    top: 0;
    line-height: 40px;
    width: 40px;
    text-align: center;
  }
  .sousuo {
    padding: 10px 0;
    font-size: 14px;
    color: #666;
    span:hover {
      color: orange;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
.gonglue {
  color: orange;
  border-bottom: 2px solid orange;
  padding-bottom: 15px;
}
.youji {
  padding: 0 20px;
  background-color: #409eff;
  height: 35px;
  line-height: 35px;
  border-radius: 10px;
  font-size: 14px;
  color: #fff;
}
</style>