<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机号" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha('ruleForm')">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkPassword">
      <el-input placeholder="确认密码" type="password" v-model="form.checkPassword"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">
      注册
    </el-button>
  </el-form>
</template>
<script>
import { async } from 'q';
export default {
  data() {
    //   确认密码
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.form.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };

     const validateUsername=(rule,value,callback)=>{
       if(value===""){
         callback(new Error('请输入用户名'))
       }else if(!(/^1[3|5|7|8][0-9]{9}/.test(value)) ){
           callback(new Error('手机号码格式错误'));
       }else{
         callback()
       }
     }
    return {
      form: {
        username: "",
        nickname: "",
        password: "",
        captcha: "",
        checkPassword: ""
      },
      rules: {
        username: [
          // {
          //   required: true,
          //   message: "请输入用户名",
          //   trigge: "blur"
          // }
           // 自定义验证手机号码
           { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigge: "blur"
          }
        ],
        nickname: [
          {
            required: true,
            message: "请输入昵称",
            trigge: "blur"
          }
        ],
        captcha: [{ 
                required: true, 
                message: '请输入验证码', 
                trigger: 'blur' 
            }],
        checkPassword: [
          {
            validator: validatePass,
           
            trigge: "blur"
          }
        ]
      }
    };
  },
  methods: {
  async  handleSendCaptcha() {
      console.log("点击了发送验证码按钮");

      if(!this.form.username){
          this.$message.error("手机号码不能为空");
                return;
        }
        

    // if(this.form.username.length !== 11){
    //     this.$confirm('手机号码格式错误', '提示', {
    //         confirmButtonText: '确定',
    //         showCancelButton: false,
    //         type: 'warning'
    //     })
    //     return
    // }








    // this.$axios({
    //     url: `/captchas`,
    //     method: "POST",
    //     data: {
    //         tel: this.form.username
    //     }
    // }).then(res => {
    //     const {code} = res.data;
    //     this.$confirm(`模拟手机验证码为：${code}`, '提示', {
    //         confirmButtonText: '确定',
    //         showCancelButton: false,
    //         type: 'warning'
    //     })
    // })

    // this.$store.dispatch('user/sendCaptcha',this.form.username).then(code=>{
    //   this.$message.success('模拟手机返回的验证码：' + code)
    // })

    //  await 可以接受promsie的返回值
     const code = await this.$store.dispatch('user/sendCaptcha',this.form.username);

     this.$message.success('模拟手机返回的验证码：' + code)
    },
    handleRegSubmit(){
      console.log('点击了注册按钮');
      
       this.$refs['form'].validate( async valid =>{
         if(valid){
   const {checkPassword, ...props} = this.form;
          //  this.$axios({
          //       url: `/accounts/register`,
          //       method: "POST",
          //       data: props
          //   }).then(res => {
          //       console.log(res.data);
          //   })
         await this.$store.dispatch('user/register',props);
        //  跳转到首页
         this.$router.replace('/');
        //  弹框提示
         this.$message.success('注册成功')

         }
       })
    }
  }
};
</script>
<style lang="less" scoped>
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>