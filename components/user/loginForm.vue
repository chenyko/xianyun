<template>
  <el-form 
        :model="form" 
        ref="form"
        :rules="rules" 
        class="form">

        <el-form-item class="form-item" prop="username">
            <el-input 
            placeholder="用户名/手机"
            v-model="form.username">
            </el-input>
        </el-form-item>

        <el-form-item class="form-item" prop="password">
            <el-input 
            placeholder="密码" 
            type="password"
            v-model="form.password">
            </el-input>
        </el-form-item>

        <p class="form-text">
            <nuxt-link to="#">忘记密码</nuxt-link>
        </p>

        <el-button 
        class="submit"
        type="primary"
        @click="handleLoginSubmit">
            登录
        </el-button>
    </el-form>

</template>

<script>
import { async } from 'q'
export default {
data(){
    return {
      form:{
        //   登陆用户名
          username:'',
        //  登陆密码
          password:''
      },
    //   表单数据
      rules:{
          username:[
              {
              required:true,
              message:'请输入用户名',
              trigge:'blur'
              }
          ],
          password:[
              {
              required:true,
               message: '请输入密码',
              trigge:'blur'
              }
          ]
      }
  
    }
},
methods:{
    handleLoginSubmit(){
      this.$refs['form'].validate( async (valid)=>{
        //   为ture就发送请求
          if(valid){
            //   this.$axios({
            //       url:"/accounts/login",
            //       method:'post',
            //       data:this.form
            //   }).then(res=>{
            //      console.log(res.data);
                 
            //      this.$store.commit('user/setUserInpo',res.data)
            //   })
            try{
               await this.$store.dispatch('user/login',this.form);
            // 跳转到首页
            // this.$router.replace('/');
            this.$router.back();
            // 弹窗提示
            this.$message.success('登陆成功')
            }catch(err){

            }
            
            
          }
      })
    }
}
}
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>