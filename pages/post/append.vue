<template>
  <div class="container">
    <div class="exothecium">
      <div class="main">
        <h2>发表新攻略</h2>
        <p class="share">分享你的个人游记，让更多人看到哦!</p>
        <form action class="el-from">
          <div class="from-title">
            <input type="text" placeholder="请输入标题" class="from-input" v-model="form.title" />
          </div>
          <div class="from-content">
            <!-- <el-form-item>
            <vue-editor 
            v-model="form.content"
            :useCustomImageHandler="true"
            @image-added="imgUpload"
            :editorToolbar="customToolbar"
            ></vue-editor>
        </el-form-item> -->
             <textarea name="content" id cols="30" rows="10" class="content" v-model="form.content"> 
                
             </textarea> 
          </div>
          <div class="from-city">
            <p class="select">选择城市</p>
            <!-- <input type="text" class="city-input" placeholder="请搜索游玩城市" v-model="form.city" /> -->
            <el-autocomplete
          v-model="form.city"
          :fetch-suggestions="citySearch"
          placeholder="请搜索游玩城市"
          class="el-autocomplete"
        ></el-autocomplete>
          </div>
        </form>
        <div class="issue">
          <button class="button" @click="pushArticle">
            <span>发布</span>
          </button>
          <span class="or">或者</span>
          <a href="#" class="draft">保存到草稿</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //  import { VueEditor } from "vue2-editor";
  let VueEditor;

if (process.browser) {
    VueEditor = require('vue2-editor').default
}
export default {
  data() {
    return {
      form: {
        city: "", //城市名称
        title: "", //文章标题
        content: "" //文章内容
      }
    };
  },
  components: {
      VueEditor
   },
  mounted(){
     
  },
  methods: {
    pushArticle() {
      if (!this.form.title) {
        this.$message({
          message: "请输入标题",
          type: "warning"
        });
        return;
      }
      if (!this.form.content) {
        this.$message({
          message: "请输入内容",
          type: "warning"
        });
        return;
      }
      if (!this.form.city) {
        this.$message({
          message: "请选择城市",
          type: "warning"
        });
        return;
      }
      this.$axios({
        url: "/posts",
        method: "post",
        data: this.form,
        headers: {
          // Bearer属于jwt的token标准
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        }
      }).then(res => {
        console.log(res);
        console.log(res.data.message);
        
        // const {data}=res.data
        
        
        if(res.data.message==='新增成功'){

        this.$message.success('新增成功')
        }
      });
    },
    citySearch(value,cd){
      if(!value.trim()){
        return cd([]);
      }
      this.$axios({
        url:'/airs/city',
        params:{
          name:value
        }
      }).then(res=>{
        console.log(res);
        
      })
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
}
.main {
  width: 750px;
  h2 {
    font-weight: 400;
    margin-bottom: 10px;
  }
  .share {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
  }
}
.from-input {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: inherit;
  outline: none;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  color: #606266;
  padding: 0 15px;
  box-sizing: border-box;
  margin-bottom: 20px;
}
input::-webkit-input-placeholder {
  color: #999;
}
.content {
  width: 100%;
  height: 400px;
  border: 1px solid #bbb;
  margin-bottom: 15px;
}
.from-city {
  width: 100%;
  .select {
    float: left;
    font-size: 14px;
    color: #606266;
    height: 40px;
    line-height: 40px;
    text-align: center;
    padding: 0 12px 0 0;
  }
  .city-input {
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    font-size: inherit;
    display: inline-block;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 0 15px;
  }
}
.issue {
  margin-top: 15px;
  .or {
    font-size: 12px;
    padding-left: 5px;
  }
  .draft {
    font-size: 12px;
    color: orange;
  }
}
.button {
  padding: 9px 15px;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  font-size: 12px;
  border-radius: 3px;
}
</style>