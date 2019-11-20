<template>
  <div class="container">
    <div class="left" v-for="(item,index) in post" :key='index'>
      <div class="crumbs">
        <a href="javascript:0;" @click="homePage">旅游攻略</a>
        <em>/</em>
        <span>攻略详情</span>
      </div>
      <h1>{{item.title}}</h1>
      <div class="post_info">攻略：{{item.created_at  }} 阅读：{{item.watch}}</div>
      <div class="article" v-html="item.content"></div>
      <div class="icon_list">
        <div>
          <i class="el-icon-edit-outline"></i>
          评论({{item.comments.length}})
        </div>
        <div @click="getCollect">
          <i class="el-icon-star-off"></i>收藏
        </div>
        <div>
          <i class="el-icon-share"></i>分享
        </div>
        <div @click="getList">
          <i class="iconfont iconding"></i>点赞
        </div>
      </div>
      <div class="comments">
        <span class="top">评论</span>
        <br />
        <el-alert title="回复 @地球发动机" type="info"></el-alert>
        <textarea name id placeholder="说点什么吧..."></textarea>
        <div class="submit_btn">
          <div></div>
          <input type="button" value="提交" />
        </div>
        <div class="comment_con">
          <div class="floor">
            <div class="user">
              <div>
                <img src="" />
                <b>地球发动机</b>2019-11-19 11:44
              </div>
              <span>3</span>
            </div>
            <div class="comment_floor">
              <div class="user">
                <div>
                  <b>地球发动机</b>2019-11-19 11:44
                </div>
                <span>3</span>
              </div>
              <p>呵呵</p>
              <div class="imgs">
                <img src="" />
                <img src="" />
              </div>
              <a href="javascript:0;" class="reply">回复</a>
            </div>
            <p>呵呵</p>
            <div class="imgs">
              <img src="" />
              <img src="" />
            </div>
            <a href="javascript:0;" class="floor_reply">回复</a>
          </div>
          <div class="floor">
            <div class="user">
              <div>
                <img src="" />
                <b>地球发动机</b>2019-11-19 11:44
              </div>
              <span>3</span>
            </div>
            <div class="comment_floor">
              <div class="user">
                <div>
                  <b>地球发动机</b>2019-11-19 11:44
                </div>
                <span>3</span>
              </div>
              <p>呵呵</p>
              <div class="imgs">
                <img src="" />
                <img src="" />
              </div>
              <a href="javascript:0;" class="reply">回复</a>
            </div>
            <p>呵呵</p>
            <div class="imgs">
              <img src="" />
              <img src="" />
            </div>
            <a href="javascript:0;" class="floor_reply">回复</a>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <h3>相关攻略</h3>
      <ul>
        <li>
          <img src="" />
          <div>
            <p>塞班贵？一定是你的打开方式不对！6000块玩转塞班6000块玩转塞班6000块玩转塞班</p>
            <span>2019-11-19 3:37 阅读</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      post:[]
    };
  },
  methods: {
     homePage(){
      this.$router.push('/post')
    },
    getPost(){
      const {id}=this.$route.query
      this.$axios({
      url:'/posts',
      params:{id},
   }).then(res=>{
    //  console.log(res);
     this.post=res.data.data;
     console.log(this.post);
   })
  },
  getCollect(){
    const {id}=this.$route.query
    this.$axios({
      url:'/posts/star',
      params:{id},
      headers: {
          // Bearer属于jwt的token标准
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        }
    }).then(res=>{
      //  console.log(res);
      //  if(res.statusCode===400){
      //    this.$message({
      //     message: "已收藏",
      //     type: "warning"
      //   });
      //  }
    })
  },
  getList(){
    const {id}=this.$route.query;
    this.$axios({
      url:'/posts/like',
      params:{id},
      headers: {
          // Bearer属于jwt的token标准
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        }
    }).then(res=>{
      console.log(res);
    })
  }
   
  },
  mounted() {
   this.getPost()
  },
  // filters:{
  //  data(value){
  //    value=moment(this.post[0].created_at).format(
  //       "YYYY-MM-DD HH:MM"
  //     );
  //  }
  // },
};
</script>

<style lang="less" scoped>
.container {
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  width: 1000px;

  .left {
    width: 700px;

    .crumbs {
      font-size: 14px;

      a {
        color: #303133;

        &:first-child {
          font-weight: 700;
        }
      }

      em {
        margin: 0 9px;
        color: #c0c4cc;
        font-weight: 700;
      }

      span {
        color: #606266;
        font-weight: 400;
      }
    }

    h1 {
      padding: 20px 0;
      border-bottom: 1px solid #ddd;
    }

    .post_info {
      padding: 20px;
      font-size: 16px;
      color: #999;
      font-size: 16px;
      text-align: right;
    }

    /deep/ .article {
      p {
        font-size: 16px;
      }
      img {
        max-width: 100%;
      }
    }

    .icon_list {
      display: flex;
      justify-content: center;
      margin: 50px 0 30px;

      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 20px;
        font-size: 14px;
        color: #999;

        i {
          margin-bottom: 5px;
          font-size: 28px;
          color: orange;
        }
      }
    }

    .comments {
      .top {
        font-size: 18px;
      }

      .el-alert {
        max-width: 200px;
      }

      textarea {
        margin: 20px 0 5px;
        padding: 5px 15px;
        width: 100%;
        height: 54px;
        border: 1px solid #dcdfe6;
        font-size: 16px;
        color: #606266;
        border-radius: 4px;
        resize: none;
        box-sizing: border-box;
      }

      .submit_btn {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        input {
          width: 56px;
          height: 28px;
          background: #409eff;
          border: none;
          border-radius: 3px;
          color: #fff;
          outline: none;

          &:hover {
            background: rgb(102, 177, 255);
          }

          &:active {
            background: rgb(58, 142, 230);
          }
        }
      }
    }

    .comment_con {
      margin-top: 30px;
      width: 100%;
      border: 1px solid #ddd;

      .floor {
        padding: 20px;
        border-bottom: 1px dashed #ddd;

        &:nth-child(2n) {
          border-bottom: none;
        }

        .user {
          margin-bottom: 5px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          color: #999;

          div {
            display: flex;
            align-items: center;
          }

          img {
            margin-right: 5px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
          }

          b {
            margin-right: 5px;
            color: #666;
          }
        }

        .floor_reply {
          float: right;
          text-align: right;
          color: transparent;
          font-size: 12px;

          &:hover {
            text-decoration: underline;
          }
        }

        &:hover .floor_reply {
          color: #1e50a2;
        }

        .comment_floor {
          overflow: hidden;
          margin: 10px auto 0;
          padding: 5px 15px;
          width: 99%;
          border: 1px solid #ddd;
          background: rgb(249, 249, 249);
          box-sizing: border-box;

          .reply {
            float: right;
            text-align: right;
            color: transparent;
            font-size: 12px;

            &:hover {
              text-decoration: underline;
            }
          }

          &:hover .reply {
            color: #1e50a2;
          }
        }

        .imgs {
          margin-top: 10px;

          img {
            width: 80px;
            height: 80px;
            padding: 3px;
            border: 1px dashed #ddd;
          }
        }
      }
    }
  }

  .right {
    width: 280px;

    h3 {
      border-bottom: 1px solid #ddd;
      font-weight: normal;
      padding-bottom: 10px;
    }

    ul {
      li {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #ddd;

        img {
          margin-right: 10px;
          width: 100px;
          height: 80px;
          object-fit: cover;
          border: 1px solid #ddd;
        }

        div {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        p {
          font-size: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          line-height: 18px;
        }

        span {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>