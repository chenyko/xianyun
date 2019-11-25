<template>
  <div>
    <el-row :gutter="24" class="hotel-list" >
      <el-col :span="8">
        <div class="imgCover">
          <router-link :to="`/hotel/hotelDetail?id=${item.id}`">
            <img :src="item.photos" alt />
          </router-link>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="hotelDesc">
          <router-link :to="`/hotel/hotelDetail?id=${item.id}`">
            <h4 class="hotel-name">{{item.name}}</h4>
          </router-link>
          <div class="hotel-cn-title">
            <span>{{item.alias}}</span>
            <span class="iconfont" ref="iconfont">
              <i class="iconfont iconhuangguan" v-for="(item,index) in arr" :key="index"></i>
            </span>
            {{item.hoteltype.name}}
          </div>
          <el-row type="flex" class justify="space-between">
            <el-col :span="10">
              <el-rate
                v-model="item.stars"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}分"
                class="score"
              ></el-rate>
            </el-col>
            <el-col :span="7">
              <span class="comments">13</span>条评价
            </el-col>
            <el-col :span="7">
              <span class="notes">53</span>篇游记
            </el-col>
          </el-row>
          <p class="location-row">
            <i class="el-icon-location"></i>
            {{item.address}}
          </p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="differPrice">
          <el-table :data="item.products" :show-header="false">
            <el-table-column :prop="item.products.name">
              <template slot-scope="scope">{{scope.row.name}}</template>
            </el-table-column>
            <el-table-column :prop="item.products.price">
              <template slot-scope="scope">
                <span style="margin-left: 10px" class="price">￥{{ scope.row.price }}</span> 起
                <i class="el-icon-arrow-right"></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default(){
        return{
          hotellevel: {
            level: 0,
          },
          hoteltype: {},
          stars: 0,
          products: [],
          arr:[]
        }
      }
    }
  },
  computed:{
    arr(){
        this.item.arr = []
        if(this.item.hotellevel){
           for (let i = 0; i < this.item.hotellevel.level; i++) {
          // console.log(this.item.arr);
            
              this.item.arr.push(i)
          }
        }
        return this.item.arr
    }
  },
  data() {
    return {
      // hotelData: [
      //   {
      //     hotellevel: {
      //       level: 0
      //       // arr:[]
      //     },
      //     hoteltype: {},
      //     stars: 0,
      //     products: []
      //   }
      // ]
    };
  },
  methods: {},
  // mounted() {
  //     this.$axios({
  //       url:'/hotels/comments',
  //       params:{
  //         hotel:5
  //       }
  //     }).then(res=>{
  //       console.log(res);
  //     })
  // }
};
</script>

<style scoped lang="less">
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.hotel-list {
  padding: 25px 0;
  border-bottom: 1px solid #eee;
}
.el-col {
  border-radius: 4px;
}
.imgCover {
  img {
    width: 320px;
    height: 210px;
  }
}
.hotel-name {
  font-size: 28px;
  font-weight: 400;
}
.hotel-cn-title {
  color: #999;
  margin-bottom: 10px;
}
.score {
  font-size: 18px;
  // margin-right: 6px;
}
.comments,
.notes {
  color: #f90;
}
.location-row {
  font-size: 14px;
  color: #666;
}

.price {
  color: #f90;
  font-size: larger;
}
.iconhuangguan {
  color: #f90;
}
</style>