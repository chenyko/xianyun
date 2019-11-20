<template>
  <div class="container">
    <div class="exothecium">
      <div class="main" v-for='(item,index) in post' :key="index">
        <div class="breadcrumb">
          <a  class="left" @click="homePage">
            <p >旅游攻略</p>
          </a>
          <span class="right">
            / 攻略详情
          </span>
        </div>
        <h1 class="title">{{item.title}}</h1>
        <div class="post-info">
          <span class="strategy">攻略：{{item.created_at}}</span>
          <span class="read">阅读：{{item.watch}}</span>
        </div>
        <div class="post-content">
          <div class="post-text">
            <div class="one" v-html="item.content"></div>
          </div>
        </div>
        <div class="icon">
        <div class="text-icon">
          <div class="comment">
            <i class="el-icon-edit-outline"></i>
            <span>评论(100)</span>
          </div>
          <div class="shouc">
           <i class="el-icon-star-off"></i>
           <span>收藏</span>
          </div>
          <div class="share">
            <i class="el-icon-share"></i>
            <span>分享</span>
          </div>
          <div class="like">
           <i class="el-icon-sugar"></i>
           <span>点赞</span>
          </div>
        </div>
       </div> 
      </div>
    </div>
  </div>
</template>
   
<script>
export default {
  data(){
    return{
        post:[],
    }
  },
  methods:{
    homePage(){
      this.$router.push('/post')
    },
    getPost(){
      const {id}=this.$route.query
      this.$axios({
      url:'/posts',
      params:{id}
   }).then(res=>{
    //  console.log(res);
     this.post=res.data.data;
     console.log(this.post);
     
   })
    },
  },
  mounted(){
   this.getPost()
   
  }
};
</script>

<style lang="less" scoped>

  /deep/.one * {
    max-width: 700px!important;
  }

// /deep/ p img{
//   width: 700px;
// }
.container{
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
}
.main{
  width: 700px;
}
.breadcrumb{
  font-size: 14px;
  .left{
    float: left;
    padding-right: 10px;
  }
  .right{
    color: #606266
  }
}
h1{
  padding: 15px 0;
}
.post-info{
  padding: 20px;
  color: #999;
  text-align: right;
  border-top: 1px solid #ddd;
  .strategy{
    padding-right: 15px;
  }
}
// .post-image{
//   margin-bottom:15px;
//   img{
//     width: 700px;
//     height: 400px;
//   }
// }
// .icon{
//   display: flex;
// }
.text-icon{
  display: flex;
  color: orange;
  justify-content: center;
  .comment{
    padding-right: 15px;
  }
  i{
    font-size: 28px;
  }
  span{
    font-size: 14px;
    color: #999;
  }
}
</style>