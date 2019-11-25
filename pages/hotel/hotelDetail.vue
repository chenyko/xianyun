<template>
   <div class="container">
        <div class="miaobao">
            <span>酒店</span>
            <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
            <span>南京市酒店</span>
             <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
            <span>{{hotelItem.name}}</span>
        </div>
        <p class="hotel_name">
            好来阁商务宾馆
            <i v-for="(item,index) in hotelItem.arr" :key="index" class="iconfont iconhuangguan"></i>
        </p>
        <p class="hotel_alias">{{hotelItem.alias}}</p>
        <el-row>
            <i class="iconfont iconlocation"></i>
            <span>{{hotelItem.address}}</span>
        </el-row>
        <el-row class="hotel_picture">
            <el-col :span="16">
                <img class="img7" src="/imgs/main.jpg" alt="">
            </el-col>
            <el-col :span="8">
                <img class="img8" src="/imgs/1.jpg" alt="">
                <img class="img8" src="/imgs/2.jpg" alt="">
                <img class="img8" src="/imgs/3.jpg" alt="">
                <img class="img8" src="/imgs/4.jpg" alt="">
                <img class="img8" src="/imgs/5.jpg" alt="">
                <img class="img8" src="/imgs/6.jpg" alt="">
            </el-col>
        </el-row>
        <el-row type="flex">
             <el-col :span="24">
                <div class="differPrice">
                    <el-table :data="hotelItem.products" :show-header="false">
                        <el-table-column :prop="hotelItem.products.name">
                        <template slot-scope="scope">{{scope.row.name}}</template>
                        </el-table-column>
                         <el-table-column :prop="hotelItem.products.bestType">
                        <template slot-scope="scope">{{scope.row.bestType}}</template>
                        </el-table-column>
                        <el-table-column :prop="hotelItem.products.price">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px" class="price">￥{{ scope.row.price }}</span> 起
                            <i class="el-icon-arrow-right"></i>
                        </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <div>地图</div>
        </el-row>
        <el-row>
            <div data-v-3cab31ba="" class="info-row">
                <div data-v-3cab31ba="" class="assets-info el-row">
                    <div data-v-3cab31ba="" class="assets-info-hd el-col el-col-4">基本信息</div>
                    <div data-v-3cab31ba="" class="assets-info-bd el-col el-col-20">
                        <div data-v-3cab31ba="" class="base-info el-row el-row--flex"
                            style="margin-left: -5px; margin-right: -5px;">
                            <div data-v-3cab31ba="" class="el-col el-col-24" style="padding-left: 5px; padding-right: 5px;">入住时间:
                                14:00之后</div>
                            <div data-v-3cab31ba="" class="el-col el-col-24" style="padding-left: 5px; padding-right: 5px;">离店时间:
                                12:00之前</div>
                            <div data-v-3cab31ba="" class="el-col el-col-24" style="padding-left: 5px; padding-right: 5px;">2010年开业
                                / 2015年装修</div>
                            <div data-v-3cab31ba="" class="el-col el-col-24" style="padding-left: 5px; padding-right: 5px;">酒店规模:
                                148间客房</div>
                        </div>
                    </div>
                </div>
                <div data-v-3cab31ba="" class="assets-info el-row">
                    <div data-v-3cab31ba="" class="assets-info-hd el-col el-col-4">主要设施</div>
                    <div data-v-3cab31ba="" class="assets-info-bd el-col el-col-20"><span data-v-3cab31ba="" type="info"
                            class="assets-info-item">外币兑换服务</span><span data-v-3cab31ba="" type="info"
                            class="assets-info-item">电梯</span><span data-v-3cab31ba="" type="info"
                            class="assets-info-item">洗衣服务</span><span data-v-3cab31ba="" type="info"
                            class="assets-info-item">热水壶</span></div>
                </div>
                <div data-v-3cab31ba="" class="assets-info el-row">
                    <div data-v-3cab31ba="" class="assets-info-hd el-col el-col-4">停车服务</div>
                    <div data-v-3cab31ba="" class="assets-info-bd base-info el-col el-col-20">
                        -
                    </div>
                </div>
                <div data-v-3cab31ba="" class="assets-info el-row">
                    <div data-v-3cab31ba="" class="assets-info-hd el-col el-col-4">品牌信息</div>
                    <div data-v-3cab31ba="" class="assets-info-bd el-col el-col-20">
                        -
                    </div>
                </div>
            </div>
        </el-row>

        <el-row>
            
        </el-row>
    </div>
</template>

<script>
// import map from "@/components/hotel/hotelDetail"
export default {
    // components:{
    //     HotelDetail
    // },
    data(){
        return {
            hotelItem:{
                products:[]
            }
        }
    },
    mounted(){
        const {id} = this.$route.query
        this.$axios({
            url:'/hotels',
            params:{
                id
            }
        }).then(res=>{
            console.log(res.data.data[0]);
            this.hotelItem = res.data.data[0]
            this.hotelItem.arr = []
            if(this.hotelItem.hotellevel){
                this.hotelItem.arr.length = this.hotelItem.hotellevel.level
            }
        })
    }
}
</script>

<style lang="less" scoped>
.img8{
    width: 155px;
    height: 110px;
    margin-left: 5px;
    margin-bottom: 10px;
}
.container{
    width:1000px;
    margin:20px auto;
}
.miaobao{
    font-size: 14px;
}
.hotel_name{
    font-size: 22px;
    margin-top: 20px;
}
.iconhuangguan{
    color: #f90;
}
.hotel_alias{
    font-size: 14px;
    color: #999;
}
.img7{
    height: 360px;
    width: 640px;
}
.hotel_picture{
    margin: 20px 0;
    padding: 10px;
}
.score {
  font-size: 18px;
  margin-bottom: 10px;
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
.el-icon-cherry {
  color: #f90;
}
.assets-info{
    padding: 20px 0;
}
.info-row{
    margin-top: 25px;
}
</style>